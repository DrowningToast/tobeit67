import { ClassSlotAttributes } from "./ClassData";

export interface reservationResponse {
  data?: DataEntity[] | null;
}
export interface DataEntity {
  attributes: I1;
}

export interface I1 {
  class_slot: {
    data: {
      attributes: ClassSlotAttributes;
    };
  };
}
