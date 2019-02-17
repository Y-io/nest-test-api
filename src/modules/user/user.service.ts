import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, ITokenInfo, ICreateLogin, IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // 新建用户
  async createAdmin(username: string, password: string): Promise<IUser> {
    let user: User = await this.userModel.findOne({
      username,
    });
    if (user) throw new HttpException('该用户已存在', 409);

    user = await this.userModel.create({ username, password });

    await user.save();
    return user;
  }

  // 创建登录
  async createlogin(loginInfo: ICreateLogin): Promise<ITokenInfo> {
    const { username: loginName, mobile, password } = loginInfo;

    if (!loginName && !mobile)
      throw new HttpException('账号或者手机至少有一样', 404);

    let user: User;
    if (loginName) user = await this.userModel.findOne({ username: loginName });
    if (mobile) user = await this.userModel.findOne({ mobile });

    if (!user || !(await user.comparePassword(password)))
      throw new HttpException('账号或者密码错误', 404);

    const { _id, username } = user;
    return await user.createToken({ _id, username }, 1);
  }

  // 根据id查询用户
  async findUserById(id: string): Promise<User> {
    const user: User = await this.userModel.findById(id);

    if (!user) throw new HttpException('该用户不存在', 404);

    return user;
  }
}
