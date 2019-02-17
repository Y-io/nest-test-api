import { Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  parent: Category;
  paths: string[];
  children: Category[];
  created: Date;
  updated: Date;
}

export interface ICategoryInput {
  name: string;
  description?: string;
  parent?: string;
  children?: string[];
  paths?: string[];
}
