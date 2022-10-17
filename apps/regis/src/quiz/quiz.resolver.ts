import { Resolver, Query, Args } from '@nestjs/graphql';
import { Quiz } from './quiz.model';
import { QuizService } from './quiz.service';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private readonly quizService: QuizService) { }

  @Query(() => [Quiz], { nullable: true })
  async quiz(
    @Args({ name: 'quiz', type: () => Quiz, nullable: true })
    quiz: Quiz
  ) {
    return await this.quizService.getQuiz()
  }
}
