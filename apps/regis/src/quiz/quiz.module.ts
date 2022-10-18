import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizResolver } from './quiz.resolver';

@Module({
  imports: [],
  providers: [QuizService, QuizResolver]
})
export class QuizModule {}
