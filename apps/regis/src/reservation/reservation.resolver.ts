import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth.guard';
import { ReservationInput } from './reservation.model';
import { ReservationService } from './reservation.service';

@Resolver()
@UseGuards(AuthGuard)
export class ReservationResolver {
  constructor(private readonly reservationService: ReservationService) {}

  // A mutation that create a reservation

  @Mutation(() => Boolean, { name: 'create_reservation' })
  async createReservation(
    @Args('reservation') reservation: ReservationInput,
  ): Promise<boolean> {
    return await this.reservationService.create_reservation(reservation);
  }
}
