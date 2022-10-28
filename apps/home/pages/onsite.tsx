import { useQuery } from "@apollo/client";
import { Button, Select, ThemeIcon } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { firebaseReady, firebaseUserAtom } from "../components/firebase";
import OnsiteTicket from "../components/onsite/ticket";
import { getReservation } from "../gql/query";
import {
  Classroom,
  ClassSlotsDatum,
  ReservationData,
} from "../gql/types/ClassData";
import { client as cmsClient } from "../gql/gql-client";
import { IconBookmark, IconBookmarkOff } from "@tabler/icons";
import Link from "next/link";
import reserveSeat from "../components/onsite/onsiteUtils";

const OnsitePage = () => {
  const [firebaseUser] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  const [isFliped, setFliped] = useState(false);

  const { data, loading } = useQuery<ReservationData>(getReservation, {
    client: cmsClient,
    skip: !firebaseUser?.email,
    variables: {
      email: firebaseUser?.email,
    },
  });

  const availableDates = useMemo(() => {
    // [1400,1500]
    if (!data?.classSlots) return [];
    return data?.classSlots.data.reduce((prev, current) => {
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
  }, [data?.classSlots.data, loading]);

  const [selectedDate, setDate] = useState<string | null>();

  // Available classes of the selected time slot
  const availableClasses = useMemo(() => {
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

  // Confirm timeslot <callsign>
  const [confirmed, setConfirmed] = useState<string | null>();

  // Check has the user already reserve a seat for this time slot
  const isDisabled = useMemo(() => {
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

  // Check if the user is logged in or not and is a valid camper or not
  // console.log(data?.reservations.data?.[0]);

  return (
    <section className="bg-[#FFF0DA] min-h-screen w-full flex flex-col items-center justify-around px-16 py-12 gap-y-4">
      <OnsiteTicket
        fliped={isFliped}
        shownClasses={availableClasses}
        data={data}
      />
      <div className="grid grid-rows-3 grid-cols-5 gap-y-1 text-2B w-full h-full place-items-center max-w-[360px]">
        <button
          onClick={() => {
            setDate(null);
            setFliped(!isFliped);
          }}
          className="col-span-5 bg-white rounded-lg py-3 w-full"
        >
          พลิกบัตร
        </button>
        <AnimatePresence mode="wait">
          {!isFliped ? (
            <button className="col-span-5 bg-white rounded-lg py-3  w-full">
              Discord
            </button>
          ) : (
            <Select
              disabled={isDisabled}
              className="col-span-5 w-full min-h-fit"
              placeholder="วิชาที่อยากเรียน"
              data={availableClasses
                // remove classes already selected in the different time slot
                .filter((classObj) => {
                  return !data?.reservations.data?.find(
                    (reservation) =>
                      reservation.attributes.class_slot.data.attributes.class
                        .data.attributes.title ===
                      classObj.class.data.attributes.title
                  );
                })
                // filter out full classes
                .filter((classObj) => {
                  return (
                    classObj.slot.attributes.reservations.data.length <
                    classObj.slot.attributes.maxStudents
                  );
                })
                // remain classes, map out to label and value
                .map((classObj) => ({
                  label: classObj.class.data?.attributes.title,
                  value: classObj.slot.attributes.callsign,
                }))}
              onChange={(value) => {
                setConfirmed(
                  availableClasses.find(
                    (classObj) => classObj.slot.attributes.callsign === value
                  )?.slot.attributes.callsign
                ); // callsign
              }} // set confirmed class
              value={confirmed}
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {!isFliped ? (
            <Link href="/signout" passHref>
              <a className="col-span-5 bg-white rounded-lg py-3 w-full">
                <button className="bg=white w-full">Signout</button>
              </a>
            </Link>
          ) : (
            <>
              <Select
                className="col-span-4 w-full min-h-fit"
                placeholder="XX/XX / XX:XX"
                data={availableDates.map((date) => ({
                  label: date.formated,
                  value: date.date as string,
                }))}
                onChange={(e) => {
                  setConfirmed(null);
                  setDate(e);
                }}
                value={selectedDate}
              />

              <ThemeIcon
                onClick={() => {
                  if (!confirmed) return;
                  reserveSeat(confirmed);
                }}
                size={32}
                className={`${
                  confirmed ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                color={`${confirmed && !isDisabled ? "green" : "red"}`}
              >
                {confirmed && !isDisabled ? (
                  <IconBookmark size={48} />
                ) : (
                  <IconBookmarkOff size={48} />
                )}
              </ThemeIcon>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OnsitePage;
