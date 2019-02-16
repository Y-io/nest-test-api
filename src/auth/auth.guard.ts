import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_DEFINITION } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { User } from 'src/modules/user/user.interface';

@Injectable()
export class AuthGurad implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      ROLES_DEFINITION,
      context.getHandler(),
    );
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    let user: User;
    console.log('开始进入校验');
    if (request) {
      // rest api验证入口
      console.log('Request：', request.headers.authorization);
      if (!request.headers.authorization) {
        return false;
      }

      user = <User>(
        await this.authService.validateUser(request.headers.authorization)
      );
      request.user = user;
    } else {
      // GraphQl验证入口
      const ctx: any = GqlExecutionContext.create(context).getContext();
      console.log('GraphQl:', ctx);
      if (!ctx.headers.authorization) {
        return false;
      }
      user = <User>(
        await this.authService.validateUser(ctx.headers.authorization)
      );
      ctx.user = user;
    }

    if (user && !!user.roles.length) {
      console.log('用户信息：', user.roles);
      let len: number = 0;

      user.roles.forEach(v => {
        console.log(v, roles.includes(v));
        if (roles.includes(v)) len++;
      });

      console.log('角色组个数：', len);
      return len !== 0;
    }
    console.log('校验完毕');
    return false;
  }
}
