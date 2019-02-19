import * as mongoose from 'mongoose';
import { schemaOptions } from '../base.schema';
const { Schema } = mongoose;

export const CourseSupplierSchema = new Schema(
  {
    name: String,
    status: String,
    content: [String], // 文字内容
    contentImage: [String], // 图片内容
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    recycle: Boolean,
    top: Boolean,
    // comment: [ObjectId],
    minPeople: Number,
    maxPeople: Number,
    price: Number,
    discountPrice: Number,
    banner: [String],
    sex: Number,
  },
  schemaOptions,
);
