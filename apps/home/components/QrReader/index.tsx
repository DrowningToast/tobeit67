import { MainBase } from "airtable-api";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { QrReader as Reader, QrReaderProps } from "react-qr-reader";
import {
  checkInCamper,
  fetchAirtaableStaffByEmail,
  fetchAirtableOnsiteCampers,
  OnsiteCamperRecord,
} from "../airtable/airtableQuery";
import { firebaseReady, firebaseUserAtom } from "../firebase";

interface Props {
  suffix: "in" | "out";
  selectedDay: number;
}

const QrReader: React.FC<Props> = ({ suffix, selectedDay }) => {
  console.log(selectedDay);
  const checkIn = useCallback(
    async (result: any | null | undefined, error) => {
      // MainBase.table("Attendance").update();
      if (!result?.getText()) return;
      console.log(result.getText());
      alert(result?.getText());
      const target = campers.find(
        (camper) => `${camper.team}0${camper.tid}` === result?.getText()
      );
      console.log(selectedDay);
      if (!target?.id) return;
      await checkInCamper(target?.id!, String(selectedDay), suffix);
    },
    [selectedDay]
  );

  const router = useRouter();
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

      const staffs = await fetchAirtaableStaffByEmail(firebaseUser?.email!);
      if (staffs.length <= 0) {
        alert("Invalid staff email, please double check the target resource");
        return router.push("/");
      }
    };

    fetchCampers();
  }, [ready, firebaseUser?.email]);

  return (
    <div className="w-64 h-64 aspect-square">
      {campers.length && selectedDay && (
        <Reader
          key={`${selectedDay}-${suffix}`}
          onResult={(result, error) => {
            checkIn(result, error);
          }}
          videoContainerStyle={{ width: "100%" }}
          constraints={{ width: 512, height: 512 }}
        />
      )}
    </div>
  );
};

export default memo(QrReader);
