import { SchemaOptions } from 'mongoose';

export const schemaOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  timestamps: true,
};
