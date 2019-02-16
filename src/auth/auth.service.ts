import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationError } from 'apollo-server-core';
import { UserService } from 'src/modules/user/user.service';
// import { config } from 'dotenv';
import { User } from 'src/modules/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(token) {
    if (!token)
      throw new AuthenticationError('请求头缺少授权参数：Authorization');

    if (token.slice(0, 6) === 'Bearer') {
      token = token.slice(7);
    } else {
      throw new AuthenticationError('授权代码前缀不正确: Bearer');
    }

    try {
      const decodedToken = <{ _id: string; username: string }>(
        jwt.verify(token, process.env.SECRET)
      );

      const user: User = await this.userService.findUserById(decodedToken._id);
      // console.log(user, '角色信息');
      return user;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthenticationError('授权代码错误');
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new AuthenticationError('授权代码已经过期');
      }
    }
  }
}
