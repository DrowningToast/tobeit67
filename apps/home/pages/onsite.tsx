import { useQuery } from "@apollo/client";
import { Button, Select, ThemeIcon } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { firebaseReady, firebaseUserAtom } from "../components/firebase";
import OnsiteTicket from "../components/onsite/ticket";
import { getAvailableClasses } from "../gql/query";
import { ClassData, Classroom, ClassSlotsDatum } from "../gql/types/ClassData";
import { client as cmsClient } from "../gql/gql-client";
import { IconCheck } from "@tabler/icons";
import Link from "next/link";

const OnsitePage = () => {
  const [firebaseUser] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  const [isFliped, setFliped] = useState(false);

  const { data, loading } = useQuery<ClassData>(getAvailableClasses, {
    client: cmsClient,
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
      .filter((classSlot) => classSlot.attributes.start === selectedDate)
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

  // console.log(availableClasses);

  // Check if the user is logged in or not and is a valid camper or not
  useEffect(() => {}, []);

  return (
    <section className="bg-[#FFF0DA] min-h-screen w-full flex flex-col items-center justify-around px-16 py-12 gap-y-4">
      <OnsiteTicket fliped={isFliped} shownClasses={availableClasses} />
      <div className="grid grid-rows-3 grid-cols-5 gap-y-2 text-2B w-full h-full place-items-center">
        <button
          onClick={() => setFliped(!isFliped)}
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
              className="col-span-5 w-full min-h-fit"
              placeholder="วิชาที่อยากเรียน"
              // every classes
              data={availableClasses.map((classObj) => ({
                label: classObj.class.data.attributes.title,
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
                onChange={setDate}
                value={selectedDate}
              />
              <ThemeIcon size={32} color="orange">
                <IconCheck size={48} />
              </ThemeIcon>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default OnsitePage;
