import { Injectable } from '@nestjs/common';
import Request from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTest(request: Request): string {
    console.log(request);
    return 'Test!';
  }
}
