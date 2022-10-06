import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  CAMPER,
  STAFF,
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  year: string;

  @Field()
  province: string;

  @Field()
  phoneNum: string;

  @Field((type) => Role)
  role: Role;
}
