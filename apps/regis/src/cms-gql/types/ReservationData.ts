export interface Reservations {
  data: {
    attributes: {
      firstname: string;
      lastname: string;
      class_slot: {
        data: {
          attributes: {
            callsign: string;
            start: string;
          };
        };
      };
    };
  }[];
}
