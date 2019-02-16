import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { APP_INTERCEPTOR, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';

import { AuthGurad } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { HttpErrorFilter } from './common/interceptors/http-error.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ headers: req.headers }),
      // debug: false,
      // playground: false,
    }),
    UserModule,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    { provide: APP_GUARD, useClass: AuthGurad },
    UserService,
    AuthService,
  ],
  exports: [UserService],
})
export class AppModule {}
