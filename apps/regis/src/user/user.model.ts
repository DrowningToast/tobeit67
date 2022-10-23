import {
  ArgsType,
  Field,
  Float,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum Role {
  CAMPER = 'CAMPER',
  STAFF = 'STAFF',
}

registerEnumType(Role, {
  name: 'Role',
});

export enum Grade {
  M4 = 'M4',
  M5 = 'M5',
  M6 = 'M6',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  OTHER = 'OTHER',
}

registerEnumType(Grade, {
  name: 'Grade',
});

@ObjectType('Users', {
  description: 'Camper and Staff user information',
  isAbstract: true,
})
@InputType('User', { isAbstract: true })
export class User {
  @Field((type) => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  lastname: string;
  @Field((type) => Grade, { nullable: true })
  grade: 'M4' | 'M5' | 'M6' | 'P1' | 'P2' | 'P3' | 'OTHER';
  @Field({ nullable: true })
  province: string;
  @Field({ nullable: true })
  phoneNum: string;
  @Field((type) => Role, { description: 'CAMPER | STAFF', nullable: true })
  role: 'CAMPER' | 'STAFF';
  @Field((type) => Int, { defaultValue: 0 })
  score: number;
  @Field((type) => Int, { defaultValue: 3 })
  remainingAttempt: number;
  @Field((type) => Float, { defaultValue: 0 })
  scorePercent: number;
  @Field({ nullable: true })
  onsite: boolean;
}

@InputType()
export class UserInput {
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  lastname: string;
  @Field((type) => Grade, { nullable: true })
  grade: 'M4' | 'M5' | 'M6' | 'P1' | 'P2' | 'P3' | 'OTHER';
  @Field({ nullable: true })
  province: string;
  @Field({ nullable: true })
  phoneNum: string;
}

@InputType()
export class UserEdit {
  @Field((type) => Int, { nullable: true })
  id: number;

  @Field({ nullable: true })
  firstname: string;
  @Field({ nullable: true })
  lastname: string;
  @Field((type) => Grade, { nullable: true })
  grade: 'M4' | 'M5' | 'M6' | 'P1' | 'P2' | 'P3' | 'OTHER';
  @Field({ nullable: true })
  province: string;
  @Field({ nullable: true })
  phoneNum: string;

  @Field({ nullable: true })
  emailSent: boolean;
  @Field({ nullable: true })
  onsite: boolean;
}

@InputType()
export class UserDelete {
  @Field((type) => Int, { nullable: true })
  id: number;
  @Field()
  email: string;
}
