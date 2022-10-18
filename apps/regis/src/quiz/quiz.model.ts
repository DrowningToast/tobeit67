import { ArgsType, Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('submitAnswer')
@ObjectType()
export class Answer {
  @Field(() => Int)
  id: number

  @Field(() => String)
  answer: string
}

@ObjectType('Quizzes', {
  description: 'Quiz',
  isAbstract: true
})
@InputType('Quiz', { isAbstract: true })
export class Quiz {
  @Field(_type => Int, { nullable: true })
  id: number;

  @Field(_type => String, { nullable: true })
  question: string;

  @Field(_type => String, { nullable: true })
  choiceA: string;

  @Field(_type => String, { nullable: true })
  choiceB: string;

  @Field(_type => String, { nullable: true })
  choiceC: string;

  @Field(_type => String, { nullable: true })
  choiceD: string;

  @Field(_type => String, { nullable: true })
  correct: string;
}

@InputType({ isAbstract: true })
export class SubmitQuizInput {
  @Field()
  userId: number

  @Field((_type) => [Answer], { nullable: true })
  answer: Answer[]
}

@ObjectType('QuizResult', {
  description: 'Quiz Result',
  isAbstract: true
})
export class QuizResult {
  @Field((_type) => Int, { nullable: true })
  userId: number

  @Field((_type) => Int, { nullable: true })
  score: number

  @Field((_type) => Float, { nullable: true })
  scorePercent: number

  @Field(_type => Int, { nullable: true })
  remainingAttempt: number
}