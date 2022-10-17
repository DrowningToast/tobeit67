import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';

@Module({
  imports: [HttpModule.register({
    baseURL: process.env.NODE_ENV == 'development' ? process.env.CMS_DEV
      : process.env.CMS_PROD
  })],
  providers: [QuizService, QuizResolver]
})
export class QuizModule {}
