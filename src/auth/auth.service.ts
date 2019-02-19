import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, HttpException } from '@nestjs/common';
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

  async validateUser(req) {
    if (!req || !req.headers.authorization)
      throw new HttpException('请求头缺少授权参数：Authorization', 403);
    let token = req.headers.authorization;
    if (token.slice(0, 6) === 'Bearer') {
      token = token.slice(7);
    } else {
      throw new HttpException('授权代码前缀不正确: Bearer', 403);
    }

    try {
      const decodedToken = <{ _id: string; userName: string }>(
        jwt.verify(token, process.env.SECRET)
      );

      const user: User = await this.userService.findUserById(decodedToken._id);

      return user;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new HttpException('授权代码错误', 403);
      }
      if (error instanceof jwt.TokenExpiredError) {
        throw new HttpException('授权代码已经过期', 403);
      }
    }
  }
}
