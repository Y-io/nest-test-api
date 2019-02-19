import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { ICourseSupplier, CourseSupplier } from './course-supplier.interface';
import { Roles } from 'src/core';
import { RoleEnum } from '../base.object';
import { CourseSupplierService } from './course-supplier.service';
import { CommonResult } from '../base.interface';
import { User } from 'src/core/decorators/user.decorator';
import { User as IUer } from '../user/user.interface';

@Controller('courseSupplier')
export class CourseSupplierController {
  constructor(private readonly courseSupplierService: CourseSupplierService) {}

  @Post()
  @Roles(RoleEnum.SuperAdmin, RoleEnum.Supplier)
  async createCourseSupplier(
    @User() user: IUer,
    @Body() body: ICourseSupplier,
  ): Promise<CommonResult<CourseSupplier>> {
    const data = await this.courseSupplierService.createCourseSupplier(
      user,
      body,
    );
    return { code: 200, message: '创建成功', data };
  }

  @Get()
  @Roles(RoleEnum.SuperAdmin, RoleEnum.Admin, RoleEnum.Supplier)
  async findCourseSupplier(): Promise<CommonResult<CourseSupplier[]>> {
    const data = await this.courseSupplierService.findCourseSupplier();
    return { code: 200, message: '查询成功', data };
  }

  @Put(':id')
  @Roles(RoleEnum.Supplier)
  async updataCourseSupplierById(
    @Param('id') id: string,
    @User() user: IUer,
    @Body() body: CourseSupplier,
  ): Promise<CommonResult> {
    await this.courseSupplierService.updataCourseSupplierById(id, user, body);
    return { code: 200, message: '更新成功' };
  }

  // @Delete(':id')
  // @Roles(RoleEnum.SuperAdmin, RoleEnum.Supplier)
  // async deleteCourseSupplierById(
  //   @Param('id') id: string,
  // ): Promise<CommonResult> {
  //   const;
  // }
}
