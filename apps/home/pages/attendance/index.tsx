import { NumberInput, Select } from "@mantine/core";
import { MainBase } from "airtable-api";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  checkInCamper,
  fetchAirtableOnsiteCampers,
  OnsiteCamperRecord,
} from "../../components/airtable/airtableQuery";
import { firebaseReady, firebaseUserAtom } from "../../components/firebase";
import QrReader from "../../components/QrReader";

const Attendance: React.FC = () => {
  const checkIn = async (text: string) => {
    // MainBase.table("Attendance").update()
    const target = campers.find(
      (camper) => `${camper.team}0${camper.tid}` === text
    );

    if (!target?.id) return;

    await checkInCamper(target?.id!, String(selectedDay), suffix);
  };

  const [firebaseUser] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);

  const [campers, setCampers] = useState<OnsiteCamperRecord[]>([]);
  useEffect(() => {
    if (!firebaseUser?.email || !ready) return;

    const fetchCampers = async () => {
      const records = await fetchAirtableOnsiteCampers();
      setCampers(
        records.map((record) => {
          return { id: record.id, ...record.fields };
        })
      );
    };

    fetchCampers();
  }, [ready, firebaseUser?.email]);

  const [suffix, setSuffix] = useState<"in" | "out">("in");

  const [selectedDay, setDay] = useState(1);

  return (
    <>
      <main className="min-h-screen w-full grid place-items-center bg-gray-600">
        <QrReader onResult={checkIn} />
        <NumberInput
          onChange={(e) => setDay(e ?? 1)}
          defaultValue={1}
          placeholder="1-4"
          label="Day"
          min={1}
          max={4}
          withAsterisk
        />
        <Select
          onChange={(e) => setSuffix(e as "in" | "out")}
          defaultValue="in"
          label="Suffix"
          data={[
            {
              label: "In",
              value: "in",
            },
            {
              label: "Out",
              value: "out",
            },
          ]}
        />
      </main>
    </>
  );
};

export default Attendance;
