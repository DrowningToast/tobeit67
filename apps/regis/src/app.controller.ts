import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import * as dotenv from 'dotenv';
// import { findEnv } from '../helper/findenv';
dotenv.config({ path: '../../.env' });

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/debug')
  getDebug(): string {
    return `${process.env.hello}`;
  }
}
