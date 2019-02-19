import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const CourseTimetableSchema = new Schema({
  title: String,
});
