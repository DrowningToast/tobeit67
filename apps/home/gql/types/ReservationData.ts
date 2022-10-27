import { ClassSlotAttributes } from "./ClassData";

export interface reservationResponse {
  data?: DataEntity[] | null;
}
export interface DataEntity {
  attributes: ClassSlotAttributes;
}
