import { Controller, Get } from '@nestjs/common';

import { Roles } from 'src/core';

@Controller()
export class UserController {
  @Get('hello')
  @Roles('User')
  showAllUsers() {
    return { value: 'helle' };
  }
}
