import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';

import { UserService } from './user.service';
import { User, ITokenInfo, IFindUser } from './user.interface';
import { Roles } from 'src/core';
import { IPaginator } from '../base.service';
import { RoleEnum } from '../base.object';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // 创建管理员
  @Mutation()
  // @Roles(RoleEnum.SuperAdmin, RoleEnum.User)
  async createAdmin(
    @Args('userName') userName: string,
    @Args('password') password: string,
    @Args('role') role: string,
  ): Promise<User> {
    return await this.userService.createAdmin(userName, password, role);
  }

  // 管理员登录
  @Query()
  async adminLogin(
    @Args('userName') userName: string,
    @Args('password') password: string,
  ): Promise<ITokenInfo> {
    return await this.userService.createlogin({
      userName,
      password,
    });
  }

  @Query()
  async findUser(@Args() body: IFindUser): Promise<IPaginator<User>> {
    return await this.userService.findUser(body);
  }

  // 获取用户详情
  @Query()
  async getUserInfo(@Context() ctx): Promise<User> {
    return ctx.user;
  }

  @Query()
  @Roles(RoleEnum.Admin)
  async findUserById(@Args('id') id: string, @Context() ctx): Promise<User> {
    if (id === ctx.user._id) return ctx.user;
    return await this.userService.findUserById(id);
  }
}
