import { Document, Types } from 'mongoose';

export interface BaseInterface extends Document {
  _id: Types.ObjectId; // mongodb id
  id: Types.ObjectId; // mongodb id
  createAt: Date; // 创建时间
  updateAt: Date; // 更新时间
}
