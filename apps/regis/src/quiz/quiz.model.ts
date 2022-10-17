import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

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
}