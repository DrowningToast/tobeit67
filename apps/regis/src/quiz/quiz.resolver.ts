import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Answer, Quiz, QuizResult, SubmitQuizInput } from './quiz.model';
import { QuizService } from './quiz.service';

@Resolver((_of) => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) { }

  @Query(() => [Quiz], { nullable: true })
  async quizzes(
    @Args({ name: 'quiz', type: () => Quiz, nullable: true })
    quiz: Quiz
  ): Promise<Quiz[]> {
    return await this.quizService.getQuiz()
  }

  @Mutation((returns) => QuizResult, { name: 'submit_quiz' })
  async submitQuiz(
    @Args('answer') submitQuizInput: SubmitQuizInput
  ): Promise<QuizResult> {
    return this.quizService.updateScore(1, 8)
  }
}
