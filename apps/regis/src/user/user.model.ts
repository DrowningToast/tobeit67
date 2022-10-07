import {
  ArgsType,
  Field,
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

@ObjectType({ description: 'Camper and Staff user information' })
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field((type) => Grade)
  grade: 'M4' | 'M5' | 'M6' | 'P1' | 'P2' | 'P3' | 'OTHER';
  @Field()
  province: string;
  @Field()
  phoneNum: string;
  @Field((type) => Role, { description: 'CAMPER | STAFF' })
  role: 'CAMPER' | 'STAFF';
  @Field()
  emailSent: boolean;
  @Field()
  onsite: boolean;
}

@InputType()
export class UserInput {
  @Field()
  email: string;
  @Field()
  firstname: string;
  @Field()
  lastname: string;
  @Field((type) => Grade)
  grade: 'M4' | 'M5' | 'M6' | 'P1' | 'P2' | 'P3' | 'OTHER';
  @Field()
  province: string;
  @Field()
  phoneNum: string;
}
