import { Controller, Get, Post } from '@nestjs/common';

@Controller()
export class UserController {
  @Post('hello')
  // @Roles('User')
  showAllUsers() {
    return { value: 'helle' };
  }
}
