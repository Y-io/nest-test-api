import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// import { config } from 'dotenv';
import { User, JwtPayload, ITokenInfo } from './user.interface';
import { RoleArr, RoleObj, StatusArr, StatusObj } from 'src/core';
import { schemaOptions } from '../base.schema';
const { Schema } = mongoose;

export const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    password: String,
    age: Number,
    email: String,
    status: {
      type: String,
      default: StatusObj.Normal,
      enum: StatusArr,
    },
    roles: {
      type: [String],
      default: [RoleObj.User],
      enum: RoleArr,
    },
    recycle: { type: Boolean, default: false },
    avatar: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  schemaOptions,
);

UserSchema.pre<User>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods = {
  // 密码对比，新密码：_password  旧密码：password
  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  },

  // 生成token
  async createToken(
    payload: JwtPayload,
    time: number = 1 || 3 || 7 || 30,
  ): Promise<ITokenInfo> {
    const accessToken = jwt.sign(payload, process.env.SECRET, {
      expiresIn: `${time}d`,
    });
    return { accessToken, expiresIn: 60 * 60 * 24 * time };
  },
};
