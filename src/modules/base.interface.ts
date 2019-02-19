import { Document, Types, ModelPopulateOptions } from 'mongoose';

export interface CommonResult<T = any> {
  code: number;
  message: string;
  data?: CommonResultList<T> | T;
}

interface CommonResultList<T> {
  [key: string]: any;
  total: number;
  list: T[];
}

export interface BaseInterface extends Document {
  _id: Types.ObjectId; // mongodb id
  // id: Types.ObjectId; // mongodb id
  createAt: Date; // 创建时间
  updateAt: Date; // 更新时间
}

export interface IPagination {
  pageNumber?: number;
  pageSize?: number;
}

export interface IPageOptions {
  sort?: any;
  limit?: number;
  offset?: number;
  page?: number;
  populates?: ModelPopulateOptions[] | ModelPopulateOptions;
  [key: string]: any;
}
