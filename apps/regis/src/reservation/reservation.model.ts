import { InputType, ObjectType } from '@nestjs/graphql';

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
  classId: number;
  email: string;
  firstname: string;
  lastname: string;
  nickname: string;
  phoneNum: string;
  team: string;
}
