import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, ITokenInfo, ICreateLogin, IFindUser } from './user.interface';
import { BaseService, IPaginator } from '../base.service';
import { IPageOptions } from '../base.interface';
import { RoleEnum } from '../base.enum';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    super(userModel);
  }

  // 新建用户
  async createAdmin(
    username: string,
    password: string,
    role: string,
  ): Promise<User> {
    if (!username || !password)
      throw new HttpException('账号或者密码不能为空', 406);

    // 防止普通用户或者未知权限注册
    if (role === RoleEnum[role] || !Object.values(RoleEnum).includes(role))
      throw new HttpException('该权限不存在', 401);

    let user: User = await this.userModel.findOne({
      username,
    });

    if (user) throw new HttpException('管理员已存在', 409);

    user = await this.userModel.create({ username, password, role });

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

    const { _id, userName } = user;
    return await user.createToken({ _id, userName }, 1);
  }

  // 根据条件查询所有用户
  async findUser(body: IFindUser): Promise<IPaginator<User>> {
    const { pageNumber, pageSize, roles } = body;
    const conditions = { role: { $in: roles } };
    const projection = {};
    const options: IPageOptions = {
      page: pageNumber,
      offset: pageSize,
    };
    return await super.paginator(conditions, projection, options);
  }

  // 根据id查询用户
  async findUserById(id: string): Promise<User> {
    if (!id) throw new HttpException('该用户不存在', 409);
    const user: User = await super.findById(id);
    if (!user) throw new HttpException('该用户不存在', 404);

    return user;
  }
}
