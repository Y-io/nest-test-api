import * as mongoose from 'mongoose';
import { Category } from './category.interface';
import { schemaOptions } from '../base.schema';
const { Schema } = mongoose;

export const CategorySchema = new Schema(
  {
    name: String,
    description: String,
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
    children: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    paths: [String],
    created: {
      type: Date,
      default: new Date(),
    },
    updated: {
      type: Date,
      default: new Date(),
    },
  },
  schemaOptions,
);

CategorySchema.pre<Category>('find', function(next) {
  this.populate('children');
  next();
});
