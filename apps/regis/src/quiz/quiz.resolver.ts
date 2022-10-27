import { Request } from 'express';
import { Headers, Request as Req, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int, Context } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Answer, QuizOutput, QuizResult, SubmitQuizInput } from './quiz.model';
import { QuizService } from './quiz.service';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Resolver((_of) => QuizOutput)
@UseGuards(AuthGuard)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) {}

  @Query(() => [QuizOutput])
  async quizzes(
    @Args({ name: 'userId', type: () => Int, nullable: true })
    userId: number,
  ): Promise<QuizOutput[]> {
    return await this.quizService.startQuiz(userId);
  }

  // Hard removed due to past deadline

  // @Mutation((returns) => QuizResult, { name: 'submit_quiz' })
  // async submitQuiz(
  //   @Args('answer') submitQuizInput: SubmitQuizInput,
  // ): Promise<QuizResult> {
  //   const score = await this.quizService.checkAnswer(submitQuizInput.answer);

  //   return await this.quizService.updateScore(submitQuizInput.email, score);
  // }
}
