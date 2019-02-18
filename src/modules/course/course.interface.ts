import { BaseInterface } from '../base.interface';
import { User } from '../user/user.interface';

export interface Course extends BaseInterface {
  title: string; // 名称
  signUpStartTime: Date; // 报名开始时间
  signUpEndTime: Date; // 报名结束时间
  startTime: Date; // 开课时间
  endTime: Date; // 结课时间
  status: string; // normal：正常, examine：审核, banned：禁止
  description: string; // 描述
  content: string; // 内容
  authon: User; // 作者，关联用户文档
  hits: number; // 点击量
  // seen_users: [ObjectId]; //	最新浏览过的用户，关联浏览过的用户文档
  recycle: boolean; // 是否加入回收站
  top: boolean; // 置顶
  // comment: [ObjectId]; // 评论
  address: string; // 上课地址
  people: number; // 课程人数上限
  price: number; // 价格
  retailPrice: number; // 零售价格，面向学校的价格
  discountPrice: number; // 零售的折扣价，用于业务员除外谈单
  poster: [string]; // 海报列表
  sex: string; // 0：不限, 1：男, 2：女
}
