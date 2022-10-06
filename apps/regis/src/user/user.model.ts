import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum Role {
  CAMPER,
  STAFF,
}

registerEnumType(Role, {
  name: 'Role',
});

@ObjectType({ description: 'Camper and Staff user information' })
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;

  @Field((type) => Int)
  year: number;

  @Field()
  province: string;

  @Field()
  phoneNum: string;

  @Field((type) => Role)
  role: Role;
}
