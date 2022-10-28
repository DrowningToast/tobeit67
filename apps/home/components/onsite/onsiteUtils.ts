import { useMemo } from "react";
import {
  Classroom,
  ClassSlotsDatum,
  ReservationData,
} from "../../gql/types/ClassData";

export const useAvailableClasses = (
  data: ReservationData | undefined,
  selectedDate: string | null | undefined
) =>
  useMemo(() => {
    if (!data?.classSlots) return [];
    return data?.classSlots.data
      .filter((classSlot) => classSlot.attributes.start === selectedDate) // Filter the class only in the selected time slot
      .filter((classSlot) => {
        return classSlot.attributes.class.data;
      }) // Filter out class slot with null classes
      .map((classSlot) => ({
        class: classSlot.attributes.class,
        classNumber: classSlot.attributes.classNumber,
        slot: classSlot,
      }));
  }, [selectedDate]) as {
    class: Classroom;
    classNumber: string;
    slot: ClassSlotsDatum;
  }[];

export const useIsDisabled = (
  availableClasses: {
    class: Classroom;
    classNumber: string;
    slot: ClassSlotsDatum;
  }[],
  data: ReservationData | undefined
) =>
  useMemo(() => {
    return Boolean(
      availableClasses
        .map((_class) => _class.slot)
        .find((slot) =>
          data?.reservations.data
            ?.map(
              (reservation) =>
                reservation.attributes.class_slot.data.attributes.start
            )
            .includes(slot.attributes.start)
        )
    );
  }, [data?.reservations, availableClasses.length]);

export const useAvailableDates = (
  data: ReservationData | undefined,
  loading: boolean
) =>
  useMemo(() => {
    // [1400,1500]
    console.log(data);
    console.log(loading);
    if (!data?.classSlots) return [];
    let nonDupeDates = data?.classSlots.data.reduce((prev, current) => {
      if (
        prev.map((dateobj) => dateobj.date).includes(current.attributes.start)
      ) {
        return prev;
      } else {
        const thatDate: Date = new Date(current.attributes.start);
        return [
          ...prev,
          {
            date: current.attributes.start,
            // formated: "30 Oct / 14:00"
            formated: `${thatDate.getDate()} ${thatDate.toLocaleString(
              "default",
              { month: "short" }
            )} / ${thatDate.getHours()}:${String(
              thatDate.getMinutes()
            ).padStart(2, "0")}`,
          },
        ];
      }
    }, [] as { date: string; formated: string }[]);

    nonDupeDates = nonDupeDates.sort((dateObj) => {
      return -new Date(dateObj.date).getTime();
    });
    return nonDupeDates;
  }, [data?.classSlots.data, loading]);
