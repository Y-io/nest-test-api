import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const CourseSchema = new Schema({
  title: String,
  signUpStartTime: Date,
  signUpEndTime: Date,
  startTime: Date,
  endTime: Date,
  status: String,
  description: String,
  content: String,
  authon: { type: Schema.Types.ObjectId, ref: 'User' },
  hits: Number,
  // seen_users: [ObjectId],
  recycle: Boolean,
  top: Boolean,
  // comment: [ObjectId],
  address: String,
  people: Number,
  price: Number,
  retailPrice: Number,
  discountPrice: Number,
  poster: [String],
  sex: String,
});
