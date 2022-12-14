import { ReservationResponse } from './ReservationData';

export interface ReservationData {
  classSlots: ClassSlots;
  reservations: ReservationResponse;
}

export interface ClassSlots {
  data: ClassSlotsDatum[];
}

export interface ClassSlotsDatum {
  id: string;
  attributes: ClassSlotAttributes;
}

export interface ClassSlotAttributes {
  callsign: string;
  start: string;
  end: string;
  slotId: string;
  classNumber: string;
  class: Classroom;
  maxStudents: number;
  reservations: Reservations;
}

export interface Classroom {
  data: ClassroomData;
}

export interface ClassroomData {
  attributes: ClassroomAttributes;
}

export interface ClassroomAttributes {
  title: string;
  description: string;
  teacher: string;
  classId: string;
}

export interface Reservations {
  data: ReservationsDatum[];
}

export interface ReservationsDatum {
  attributes: ReservationAttributes;
}

export interface ReservationAttributes {
  nickname: string;
}
