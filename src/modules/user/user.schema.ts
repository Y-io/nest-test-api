import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { User, JwtPayload, ITokenInfo } from './user.interface';
import { RoleEnum, StatusEnum } from '../base.enum';
import { schemaOptions } from '../base.schema';
import { StatusArr, RoleArr } from '../base.object';
const { Schema } = mongoose;

export const UserSchema = new Schema(
  {
    id: String,
    name: String,
    userName: String,
    password: String,
    age: Number,
    email: String,
    phone: Number,
    status: {
      type: String,
      default: StatusEnum.Normal,
      enum: StatusArr,
    },
    role: {
      type: String,
      default: RoleEnum.User,
      enum: RoleArr,
    },
    recycle: { type: Boolean, default: false },
    avatar: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  schemaOptions,
);

// 设置索引
UserSchema.index({ userName: 1 }, { unique: true });
// UserSchema.index({ email: 1 });

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
    return { accessToken, role: payload.role, expiresIn: 60 * 60 * 24 * time };
  },
};
