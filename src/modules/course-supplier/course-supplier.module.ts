import { Module } from '@nestjs/common';
import { CourseSupplierController } from './course-supplier.controller';
import { CourseSupplierService } from './course-supplier.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSupplierSchema } from './course-supplier.schema';
import { UserSchema } from '../user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CourseSupplier', schema: CourseSupplierSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [CourseSupplierController],
  providers: [CourseSupplierService],
})
export class CourseSupplierModule {}
