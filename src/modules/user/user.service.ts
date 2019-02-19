import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, ITokenInfo, ICreateLogin, IFindUser } from './user.interface';
import { BaseService, IPaginator } from '../base.service';
import { IPageOptions } from '../base.interface';
import { RoleEnum } from '../base.object';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }

  // 新建用户
  async createAdmin(
    userName: string,
    password: string,
    role: string,
  ): Promise<User> {
    if (!userName || !password)
      throw new HttpException('账号或者密码不能为空', 406);

    // 防止普通用户或者未知权限注册
    console.log(role === RoleEnum.User);
    if (role === RoleEnum.User || !Object.values(RoleEnum).includes(role))
      throw new HttpException('该权限不存在', 409);

    let user: User = await this.userModel.findOne({
      userName,
    });

    if (user) throw new HttpException('管理员已存在', 409);

    user = await this.userModel.create({ userName, password, role });

    await user.save();
    return user;
  }

  // 创建登录
  async createlogin(loginInfo: ICreateLogin): Promise<ITokenInfo> {
    const { userName: loginName, mobile, password } = loginInfo;

    if (!loginName && !mobile)
      throw new HttpException('账号或者手机至少有一样', 404);

    let user: User;
    if (loginName) user = await this.userModel.findOne({ userName: loginName });
    if (mobile) user = await this.userModel.findOne({ mobile });

    if (!user || !(await user.comparePassword(password)))
      throw new HttpException('账号或者密码错误', 404);

    const { _id, userName, role } = user;
    return await user.createToken({ _id, userName, role }, 1);
  }

  // 根据条件查询所有用户
  async findUser(body: IFindUser): Promise<IPaginator<User>> {
    const { pageNumber, pageSize, role, userName, status } = body;

    const conditions: { [key: string]: any } = {};
    if (role) conditions.role = role;
    if (userName) conditions.userName = userName;
    if (status) conditions.status = status;

    const projection = {};
    const options: IPageOptions = {
      page: pageNumber,
      limit: pageSize,
    };
    console.log('查询集合：', conditions);
    return await super.paginator(conditions, projection, options);
  }

  // 根据id查询用户
  async findUserById(id: string): Promise<User> {
    if (!id) throw new HttpException('该用户id不存在', 409);
    const db = this.userModel.findById(id);

    db.select('-password');
    db.select('-__v');

    const user = await db.exec();

    if (!user) throw new HttpException('该用户不存在', 404);

    return user;
  }
}
