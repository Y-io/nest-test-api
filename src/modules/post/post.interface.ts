import { Document } from 'mongoose';

export interface Post extends Document {
  createdAt: Date;
  updatedAt: Date;
}
