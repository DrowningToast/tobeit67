import { useMutation, useQuery } from "@apollo/client";
import { Select, ThemeIcon } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { firebaseReady, firebaseUserAtom } from "../components/firebase";
import OnsiteTicket from "../components/onsite/ticket";
import { createReservation, getReservation } from "../gql/query";
import { ReservationData } from "../gql/types/ClassData";
import { client as cmsClient } from "../gql/gql-client";
import { IconBookmark, IconBookmarkOff } from "@tabler/icons";
import Link from "next/link";
import {
  useAvailableClasses,
  useAvailableDates,
  useIsDisabled,
} from "../components/onsite/onsiteUtils";
import {
  fetchAirtableOnsiteCamperByEmail,
  OnsiteCamperRecord,
} from "../components/airtable/airtableQuery";
import { useRouter } from "next/router";

const OnsitePage = () => {
  const [firebaseUser] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  const [isFliped, setFliped] = useState(false);

  const router = useRouter();

  const { data, loading } = useQuery<ReservationData>(getReservation, {
    client: cmsClient,
    skip: !firebaseUser?.email,
    variables: {
      email: firebaseUser?.email,
    },
  });

  // Camper data from airtable, and check if the camper data is valid or not
  const [camperData, setCamperData] = useState<OnsiteCamperRecord | null>(null);
  useEffect(() => {
    if (!firebaseUser?.email && ready) {
      router.push("/");
      return;
    }
    if (!firebaseUser?.email || !ready) return;

    const fetchAirtable = async () => {
      const records = await fetchAirtableOnsiteCamperByEmail(
        firebaseUser.email!
      );
      if (records.length === 0) {
        alert(
          "Email not found, please contact your nearest staff for more information"
        );
        return router.push("/");
      }
      return setCamperData({ id: records[0].id, ...records[0].fields });
    };

    fetchAirtable();
  }, [firebaseReady, firebaseUser?.email]);

  // Confirmed timeslot <callsign>
  const [confirmed, setConfirmed] = useState<string | null>();

  // create a reservation mutation
  const [create] = useMutation(createReservation, {
    variables: {
      email: firebaseUser?.email,
      firstname: camperData?.firstname,
      lastname: camperData?.lastname,
      phoneNum: camperData?.phoneNum,
      nickname: camperData?.nickname,
      team: camperData?.team,
      callsign: confirmed,
    },
  });

  const availableDates = useAvailableDates(data, loading);

  const [selectedDate, setDate] = useState<string | null>();

  // Available classes of the selected time slot
  const availableClasses = useAvailableClasses(data, selectedDate);

  // Check has the user already reserve a seat for this time slot
  const isDisabled = useIsDisabled(availableClasses, data);

  return (
    <section className="bg-[#FFF0DA] min-h-screen w-full flex flex-col items-center justify-around px-16 py-12 gap-y-4">
      <OnsiteTicket
        fliped={isFliped}
        shownClasses={availableClasses}
        camperData={camperData}
        data={data}
      />
      <div className="grid grid-rows-3 grid-cols-5 gap-y-1 text-2B w-full h-full place-items-center max-w-[360px]">
        <button
          onClick={() => {
            setDate(null);
            setConfirmed(null);
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
                onClick={async () => {
                  await create();
                  alert("ลงทะเบียนเรียบร้อยแล้ว");
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
