import * as mongoose from 'mongoose';
import { schemaOptions } from '../base.schema';

const { Schema } = mongoose;

export const PostSchema = new Schema(
  {
    title: { type: String, unique: true },
    status: {
      type: String,
      default: 'normal',
      enum: ['normal', 'examine', 'banned'],
    },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    recycle: { type: Boolean, default: false },
  },
  schemaOptions,
);
