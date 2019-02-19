import { BaseService } from '../base.service';
import { InjectModel } from '@nestjs/mongoose';
import {} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseSupplier, ICourseSupplier } from './course-supplier.interface';
import { HttpException } from '@nestjs/common';
import { User } from '../user/user.interface';
import { RoleEnum } from '../base.object';
import * as mongoose from 'mongoose';

export class CourseSupplierService extends BaseService<CourseSupplier> {
  constructor(
    @InjectModel('CourseSupplier')
    private readonly courseSupplierModel: Model<CourseSupplier>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {
    super(courseSupplierModel);
  }

  // 创建课程
  async createCourseSupplier(
    user: User,
    body: ICourseSupplier,
  ): Promise<CourseSupplier> {
    let courseSupplier = await this.courseSupplierModel.findOne({
      name: body.name,
    });

    if (courseSupplier) throw new HttpException('该课程已存在', 409);

    courseSupplier = await this.courseSupplierModel.create({
      ...body,
      user: user._id,
    });

    await courseSupplier.save();

    return courseSupplier;
  }

  // 课程列表
  async findCourseSupplier() {
    const courseSupplier = await this.courseSupplierModel.find({});

    return courseSupplier;
  }

  // 更新课程
  async updataCourseSupplierById(
    id: string,
    user: User,
    body: CourseSupplier,
  ): Promise<void> {
    if (!id) throw new HttpException('缺少课程id', 409);

    const courseSupplier = await this.courseSupplierModel
      .findById(id)
      .populate('user', '_id')
      .exec();

    if (!courseSupplier) throw new HttpException('该课程不存在', 401);

    if (
      user.role !== RoleEnum.SuperAdmin &&
      courseSupplier.user._id.toHexString() !== user._id.toHexString()
    )
      throw new HttpException('无权限', 403);

    const session = await mongoose.startSession();

    await session.startTransaction();
    try {
      const u: User = await this.userModel.create({
        userName: '事务用户测试1',
        password: '123456',
      });
      u.save();

      await this.courseSupplierModel.findOneAndUpdate({ _id: id }, body);
      if (u._id) throw new HttpException('事务报错失败', 400);
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw new HttpException('事务报错失败', 400);
    }
  }
}
