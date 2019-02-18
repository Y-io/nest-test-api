import { Module, OnModuleInit } from '@nestjs/common';

import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

import { AuthService } from 'src/auth/auth.service';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { RoleEnum } from '../base.enum';
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
    let sadmin = await this.userModel.findOne({ userName: 'sadmin' });
    if (!sadmin) {
      sadmin = await this.userModel.create({
        userName: 'sadmin',
        password: '123456',
        role: RoleEnum.SuperAdmin,
      });

      await sadmin.save();
    }
  }
}
