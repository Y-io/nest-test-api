import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const CourseSchema = new Schema({
  name: String,
  signUpStartTime: Date,
  signUpEndTime: Date,
  startTime: Date,
  endTime: Date,
  status: String,
  description: String,
  content: [String], // 文字内容
  contentImage: [String], // 图片内容
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  hits: Number,
  // seen_users: [ObjectId],
  recycle: Boolean,
  top: Boolean,
  // comment: [ObjectId],
  address: String,
  minPeople: Number,
  maxPeople: Number,
  price: Number,
  supplierPrice: Number,
  discountPrice: Number,
  banner: [String],
  sex: Number,
});
