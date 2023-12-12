import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('USERS_SERVICE') private userService: ClientProxy) {}

  @Get('/')
  async hello() {
    return 'Hello';
  }

  @Get('users')
  async getUsers() {
    return this.userService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  @Post('users')
  async postUser() {
    return this.userService.send(
      {
        cmd: 'post-user',
      },
      {},
    );
  }
}
