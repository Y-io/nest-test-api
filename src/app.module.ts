import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import * as GraphQLJSON from 'graphql-type-json';

import { APP_INTERCEPTOR, APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthGurad } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';
import { HttpErrorFilter } from './core';
import { LoggingInterceptor } from './core';
import { CategoryModule } from './modules/category/category.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest', {
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      resolvers: { JSON: GraphQLJSON },
      context: ({ req }) => ({ headers: req.headers }),
      // debug: false,
      // playground: false,
    }),
    UserModule,
    CategoryModule,
    PostModule,
  ],
  providers: [
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
