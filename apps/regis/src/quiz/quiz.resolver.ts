import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { Answer, QuizOutput, QuizResult, SubmitQuizInput } from './quiz.model';
import { QuizService } from './quiz.service';

@Resolver((_of) => QuizOutput)
@UseGuards(AuthGuard)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) { }

  @Query(() => [QuizOutput], { nullable: true })
  async quizzes(
    @Args({ name: 'userId', type: () => Int, nullable: true })
    userId: number
  ): Promise<QuizOutput[]> {
    return await this.quizService.startQuiz(userId)
  }

  @Mutation((returns) => QuizResult, { name: 'submit_quiz' })
  async submitQuiz(
    @Args('answer') submitQuizInput: SubmitQuizInput
  ): Promise<QuizResult> {
    const score = await this.quizService.checkAnswer(submitQuizInput.answer)

    return await this.quizService.updateScore(submitQuizInput.userId, score)
  }
}
