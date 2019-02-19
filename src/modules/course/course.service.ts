import { BaseService } from '../base.service';
import { Course } from './course.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class CourseService extends BaseService<Course> {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {
    super(courseModel);
  }

  async createCourse() {
    // let course = await this.courseModel.findOne({ name });
    // if (course) throw new HttpException('该课程已存在', 406);
    // course = await this.courseModel.create({name:})
  }
}
