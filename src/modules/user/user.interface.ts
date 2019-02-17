import { Document } from 'mongoose';
import { IPagination, IResource } from 'src/core';

export interface User extends Document {
  username: string;
  password: string;
  roles: [string];
  recycle: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;

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
export interface IFindUser extends IPagination, IUser {}

export interface ICreateLogin {
  mobile?: string;
  username?: string;
  password?: string;
}

export interface ITokenInfo {
  accessToken: string;
  expiresIn: number;
}
