import { BaseInterface, IPagination } from '../base.interface';
import { Post } from '../post/post.interface';
import { Types } from 'mongoose';

export interface User extends BaseInterface {
  name: string; // 真实姓名
  id: string; // 身份证号
  userName: string; // 用户名
  password: string; // 密码
  age: number; // 年龄
  email: string; // 邮箱
  phone: number; // 电话
  role: string; // 角色列表
  status: string; // 用户状态 Normal: 正常  Examine: 审核  Banned: 禁止
  recycle: boolean; // 是否进入回收站
  avatar: string; // 头像地址
  posts: [Post]; // 帖子列表

  comparePassword(password: string): boolean;
  createToken(jwtPayload: JwtPayload, tiome: number): ITokenInfo;
}

export interface JwtPayload {
  _id: Types.ObjectId;
  userName: string;
}

export interface ICreateUserInput {
  userName: string;
  password: string;
}

export interface ICreateLogin {
  mobile?: string;
  userName?: string;
  password?: string;
}

export interface ITokenInfo {
  accessToken: string; // token
  expiresIn: number; // 过期时长
}

export interface IFindUser extends IPagination {
  name: string; // 真实姓名
  roles: string[]; // 权限
}
