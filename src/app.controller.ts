import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('healthcheck')
  healthcheck(): string {
    return 'OK';
  }
}
