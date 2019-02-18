import { Controller, Get, Post, HttpException, Body } from '@nestjs/common';
import { Roles } from 'src/core';
import { ITokenInfo } from './user.interface';
import { UserService } from './user.service';
import { CommonResult } from '../base.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
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
}
