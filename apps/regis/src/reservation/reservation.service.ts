import { BadRequestException, Injectable } from '@nestjs/common';
import { cmsClient } from 'src/cms-gql/cms-gql-client';
import {
  createReservation,
  getClassSlots,
  getReservation,
} from 'src/cms-gql/query';
import { ReservationData } from 'src/cms-gql/types/ClassData';
import { ReservationInput } from './reservation.model';
import { ReservationResponse } from 'src/cms-gql/types/ReservationData';

@Injectable()
export class ReservationService {
  create_reservation = async (reservation: ReservationInput) => {
    // Create a graphql mutation request to the CMS and create a reservation
    // If the user already has a reservation of the same class, it will return an error
    // First fetch the user preexisting reservations
    const userReservations = await this.fetchUserReservations(
      reservation.email,
    );

    // If the user already has a class in the same time slot as the new one, it will return an error
    const classSlots = await this.fetchClassSlots();
    const targetClassSlot = classSlots.data.classSlots.data.find((slot) => {
      return slot.attributes.callsign == reservation.callsign;
    });

    const alreadyHasReservation = userReservations.data.reservations.data.find(
      (reservation) => {
        return (
          reservation.attributes.class_slot.data.attributes.start ==
          targetClassSlot.attributes.start
        );
      },
    );

    if (alreadyHasReservation) {
      throw new BadRequestException({
        message: "You're already occupied at this time slot",
      });
    }

    // If the user doesn't have a reservation in the same time slot, it will create a new reservation
    const newReservation = await cmsClient.mutate({
      mutation: createReservation,
      variables: {
        email: reservation.email,
        firstname: reservation.firstname,
        lastname: reservation.lastname,
        classId: targetClassSlot.id,
        nickname: reservation.nickname,
        team: reservation.team,
        phoneNum: reservation.phoneNum,
      },
    });

    return true;
  };

  async fetchUserReservations(email: string) {
    // Fetch the user reservations from the CMS

    const userReservations = await cmsClient.query<ReservationResponse>({
      query: getReservation,
      variables: {
        email,
      },
    });

    return userReservations;
  }

  async fetchClassSlots() {
    // Fetch the class slots from the CMS

    const classSlots = await cmsClient.query<ReservationData>({
      query: getClassSlots,
    });

    return classSlots;
  }
}
