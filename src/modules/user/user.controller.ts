import { Controller, Get } from '@nestjs/common';

import { Roles } from 'src/common/decorators';

@Controller()
export class UserController {
  @Get('hello')
  @Roles('User')
  showAllUsers() {
    return { value: 'helle' };
  }
}
