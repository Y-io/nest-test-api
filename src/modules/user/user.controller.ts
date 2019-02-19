import {
  Controller,
  Get,
  Post,
  HttpException,
  Body,
  Request,
  Param,
  Query,
} from '@nestjs/common';
import { Roles } from 'src/core';
import { ITokenInfo, User, IFindUser } from './user.interface';
import { UserService } from './user.service';
import { CommonResult } from '../base.interface';
import { Context } from '@nestjs/graphql';
import { IPaginator } from '../base.service';
import { RoleArr } from '../base.object';
import { RoleEnum } from '../base.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // 创建管理员
  @Post('createAdmin')
  async createAdmin(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ): Promise<CommonResult<User>> {
    const data = await this.userService.createAdmin(userName, password, role);
    return { code: 200, message: '创建成功', data };
  }

  // 管理员登录
  @Post('adminLogin')
  async adminLogin(
    @Body('userName') userName: string,
    @Body('password') password: string,
  ): Promise<CommonResult<ITokenInfo>> {
    const data = await this.userService.createlogin({
      userName,
      password,
    });
    return { code: 200, message: '登录成功', data };
  }

  // 获取用户详情
  @Get('getUserInfo')
  @Roles(RoleEnum.SuperAdmin, RoleEnum.Admin, RoleEnum.User)
  async getUserInfo(@Request() req): Promise<CommonResult<User>> {
    console.log('用户', req.user);
    if (!req.user) {
      throw new HttpException('该用户不存在', 403);
    }
    return { code: 200, message: '查询成功', data: req.user };
  }

  @Get('findAdmin')
  async findAdmin(@Query() body: IFindUser): Promise<CommonResult<User>> {
    return await this.findUser(body, 'Admin');
  }

  @Get('findUser')
  async findUser(body: IFindUser, role?: string): Promise<CommonResult<User>> {
    const { data, total } = await this.userService.findUser({
      role: role || 'User',
      ...body,
    });

    return {
      code: 200,
      message: '查询成功',
      data: {
        list: data,
        total,
      },
    };
  }

  @Get('findRole')
  async findRole() {
    return {
      code: 200,
      message: '查询成功',
      data: RoleArr,
    };
  }
}
