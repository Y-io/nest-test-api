import { BaseInterface } from '../base.interface';
import { Post } from '../post/post.interface';

export interface User extends BaseInterface {
  username: string; // 用户名
  password: string; // 密码
  age: number; // 年龄
  email: string; // 邮箱
  roles: [string]; // 角色列表
  status: string; // 用户状态 Normal: 正常  Examine: 审核  Banned: 禁止
  recycle: boolean; // 是否进入回收站
  avatar: string; // 头像地址
  posts: [Post]; // 帖子列表

  comparePassword(password: string): boolean;
  createToken(jwtPayload: JwtPayload, tiome: number): ITokenInfo;
}

export interface JwtPayload {
  _id: string;
  username: string;
}

export interface ICreateUserInput {
  username: string;
  password: string;
}

export interface IUser {
  username?: string;
}

export interface ICreateLogin {
  mobile?: string;
  username?: string;
  password?: string;
}

export interface ITokenInfo {
  accessToken: string;
  expiresIn: number;
}
