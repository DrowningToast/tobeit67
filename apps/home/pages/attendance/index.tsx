import { Button, NumberInput, Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import QrReader from "../../components/QrReader";
import { motion } from "framer-motion";

const Attendance: React.FC = () => {
  const [suffix, setSuffix] = useState<"in" | "out">("in");
  const [selectedDay, setDay] = useState(1);
  const [showConfig, setConfig] = useState<boolean>(true);

  return (
    <>
      <main
        onDoubleClick={() => {
          console.log("bruh");
          setConfig(showConfig!);
        }}
        className="min-h-screen w-full grid place-items-center bg-gray-600"
      >
        <motion.div layout>
          <QrReader suffix={suffix} selectedDay={selectedDay} />
        </motion.div>

        {showConfig && (
          <motion.div layout className="text-white scale-150">
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
              withAsterisk
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
            <button
              className="w-full bg-white text-xl text-center text-black mt-4"
              onClick={() => setConfig(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </main>
    </>
  );
};

export default Attendance;
