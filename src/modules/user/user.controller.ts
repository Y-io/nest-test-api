import { Controller, Get, Post } from '@nestjs/common';

import { Roles } from 'src/core';

@Controller()
export class UserController {
  @Post('hello')
  // @Roles('User')
  showAllUsers() {
    return { value: 'helle' };
  }
}
