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
import { ROLES_DEFINITION } from 'src/core';
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

    if (request) {
      user = <User>await this.authService.validateUser(request);
      request.user = user;
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();

      user = <User>await this.authService.validateUser(ctx);
      ctx.user = user;
    }

    if (user.username === 'sadmin') return true;

    if (user && !!user.roles.length) {
      let len: number = 0;

      user.roles.forEach(v => {
        if (roles.includes(v)) len++;
      });

      return len !== 0;
    }
    return true;
  }
}
