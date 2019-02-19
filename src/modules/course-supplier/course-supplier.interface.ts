import { BaseInterface } from '../base.interface';
import { User } from '../user/user.interface';
import * as mongoose from 'mongoose';

export interface CourseSupplier extends BaseInterface {
  name: string; // 名称
  status: string; // normal：正常, examine：审核, banned：禁止
  content: string[]; // 文字内容
  contentImage: string[]; // 图片内容
  user: User; // 作者，关联用户文档
  recycle: boolean; // 是否加入回收站
  top: boolean; // 置顶
  // comment: [ObjectId]; // 评论
  minPeople: number; // 课程容纳最低人数
  maxPeople: number; // 课程容纳最高人数
  price: number; // 价格
  discountPrice: number; // 零售的折扣价，用于业务员除外谈单
  banner: [string]; // 海报列表
  sex: number; // 0：不限, 1：男, 2：女
}

export interface ICourseSupplier {
  _id: mongoose.Types.ObjectId; // id
  name: string; // 名称
  sex: number; // 0：不限, 1：男, 2：女
  minPeople: number; // 课程容纳最低人数
  maxPeople: number; // 课程容纳最高人数
  price: number; // 价格
  banner: [string]; // 海报列表
  content: string[]; // 文字内容
  contentImage: string[]; // 图片内容
}
