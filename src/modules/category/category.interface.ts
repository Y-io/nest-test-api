import { BaseInterface } from '../base.interface';

export interface Category extends BaseInterface {
  name: string;
  parent: Category;
  paths: string[];
  children: Category[];
}

export interface ICategoryInput {
  name: string;
  description?: string;
  parent?: string;
  children?: string[];
  paths?: string[];
}
