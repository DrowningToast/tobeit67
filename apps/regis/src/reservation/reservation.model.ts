import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

// Create reservation input type, it accepts the following
// - classId: number
// - email: string
// - firstname: string
// - lastname: string
// - nickname: string
// - phoneNum: string
// - team: enum A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P

@InputType('ReservationInput')
export class ReservationInput {
  @Field((type) => String)
  callsign: string;
  @Field((type) => String)
  email: string;
  @Field((type) => String)
  firstname: string;
  @Field((type) => String)
  lastname: string;
  @Field((type) => String)
  nickname: string;
  @Field((type) => String)
  phoneNum: string;
  @Field((type) => String)
  team: string;
}
