import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User, ITokenInfo } from './user.interface';
import { HttpException } from '@nestjs/common';
import { CommonResult } from 'src/common/interfaces';
import { Roles } from 'src/common/decorators';
import { RoleObj } from 'src/common/common.object';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation()
  @Roles(RoleObj.User)
  async createAdmin(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    if (!username || !password)
      throw new HttpException('账号或者密码不能为空', 406);

    await this.userService.createAdmin(username, password);
    return { code: 200, message: '成功' };
  }

  // 管理员登录
  @Query()
  async adminLogin(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<ITokenInfo> {
    const data: ITokenInfo = await this.userService.createlogin({
      username,
      password,
    });

    return data;
  }

  // @Query()
  // async getUserInfo(@Context() ctx): Promise<User> {
  //   const data = await this.userService.findUserById(ctx.user._id);
  //   return data;
  // }

  // @Query()
  // @Permission({
  //   name: '查询单个用户',
  //   identify: 'user:findUserById',
  //   action: 'read',
  // })
  // async findUserById(@Args('id') id: string) {
  //   const data = await this.userService.findUserById(id);
  //   return { code: 200, message: '成功', data };
  // }
}
