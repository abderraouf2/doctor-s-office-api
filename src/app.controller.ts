import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import Request from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  getTest(@Req() request: Request): string {
    console.log('Hellooo word');
    return this.appService.getTest(request);
  }
}
