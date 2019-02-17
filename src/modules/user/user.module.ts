import { Module, OnModuleInit } from '@nestjs/common';

import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

import { AuthService } from 'src/auth/auth.service';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { RoleObj } from 'src/core';
import { UserController } from './user.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserResolver, UserService, AuthService],
  exports: [UserService, AuthService],
})
export class UserModule implements OnModuleInit {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async onModuleInit() {
    await this.createSAdmin();
  }

  private async createSAdmin() {
    let sadmin = await this.userModel.findOne({ username: 'sadmin' });
    if (!sadmin) {
      sadmin = new this.userModel({
        username: 'sadmin',
        password: '123456',
        roles: [RoleObj.SuperAdmin],
      });

      await sadmin.save();
    }
  }
}
