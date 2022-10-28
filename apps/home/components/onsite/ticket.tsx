import { FC, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "react-qr-code";
import {
  Classroom,
  ClassSlotsDatum,
  ReservationData,
} from "../../gql/types/ClassData";
import { OnsiteCamperRecord } from "../airtable/airtableQuery";

const variant = {
  first: {
    rotateY: -90,
    transition: {
      duration: 0.075,
    },
  },
  second: {
    rotateY: 0,
    transition: {
      duration: 0.075,
    },
  },
  third: {
    rotateY: 90,
    transition: {
      bounce: 0,
      duration: 0.075,
    },
  },
};

const OnsiteTicket: FC<{
  fliped: boolean;
  shownClasses: {
    class: Classroom;
    classNumber: string;
    slot: ClassSlotsDatum;
  }[];
  data: ReservationData | undefined;
  camperData: OnsiteCamperRecord | undefined | null;
}> = ({ fliped, shownClasses, data, camperData }) => {
  return (
    <AnimatePresence mode="wait">
      {!fliped ? (
        <motion.main
          key={"front"}
          variants={variant}
          initial="first"
          animate="second"
          exit="third"
          className="shadow-lg rounded-xl bg-white aspect-[0.49] w-full grid grid-rows-[repeat(7,_minmax(0,_1fr))] overflow-hidden max-w-[360px]"
        >
          <div className="row-span-5 grid place-items-center relative px-6 w-full h-full  border-b-4 border-dashed border-2B ">
            <div className="z-10 py-6 flex flex-col h-full w-full">
              <h1 className="uppercase border-b-4 border-2B text-2B text-center text-4xl w-full inline-block font-chonburi pb-2">
                Onsite
              </h1>
              <h2 className="text-2B text-center font-chonburi text-lg mt-2 font-bold">
                ศุภธัช สุวัฒโน
              </h2>
              <h2 className="absolute bottom-4 inset-x-0 text-2B text-center font-chonburi text-sm mt-2 font-semibold justify-self-end">
                Team A | ApacheAnchovy
              </h2>
            </div>
            <div className="absolute inset-y-0 inset-x-10 bg-gradient-to-b from-[#4BC7CF] to-white"></div>
          </div>
          <div className="row-span-2 w-full flex flex-col h-full justify-end flex-grow">
            <h1 className="text-5xl font-chonburi text-water-blue uppercase text-center py-2">
              Admit One
            </h1>
            <div className="justify-self-end text-center text-lg py-2 font-chonburi bg-2B text-sea-serpent  ">
              TOBEIT’67
            </div>
          </div>
        </motion.main>
      ) : (
        <motion.main
          key={"back"}
          variants={variant}
          initial="first"
          animate="second"
          exit="third"
          className="shadow-lg rounded-xl bg-white aspect-[0.49] w-full grid grid-rows-[repeat(7,_minmax(0,_1fr))] overflow-hidden max-w-[360px]"
        >
          <div className="row-span-5 grid place-items-center relative px-6 w-full h-ful border-b-4 border-dashed border-2B">
            <div className="absolute inset-2 bg-2B rounded-xl px-4 py-4 flex flex-col gap-y-4 ">
              {/* Display all classes */}
              {shownClasses.length ? (
                shownClasses?.map((classData, index) => {
                  const reservsed = data?.reservations.data?.find(
                    (reservation) => {
                      return (
                        reservation.attributes.class_slot.data.attributes.class
                          .data.attributes.title ===
                        classData.class.data?.attributes.title
                      );
                    }
                  );

                  return (
                    <div
                      key={`class-${index}`}
                      className="grid grid-cols-4 grid-rows-1 text-white border-b-2 pb-4 border-white"
                    >
                      <span className="col-span-4 text-sm font-noto">
                        {classData.class.data?.attributes.teacher} /{" "}
                        <span className="text-[#FFE4C4]">
                          ห้อง {classData.slot.attributes.classNumber}
                        </span>
                      </span>
                      <h1
                        className={`col-span-3 font-semibold text-noto text-lg ${
                          // If the user already reserve this class, show the class name in yellow
                          reservsed
                            ? // Check if the user already reserve this class at the selected time lot, if so, show the class name in yellow, if it's reserved in the different time slot, grayed out
                              reservsed.attributes.class_slot.data.attributes
                                .start === classData.slot.attributes.start
                              ? "text-yellow-400"
                              : "text-gray-400"
                            : // If the class is already full, cross out the text
                            classData.slot.attributes.reservations.data
                                .length >= classData.slot.attributes.maxStudents
                            ? "line-through"
                            : ""
                        }`}
                      >
                        {classData.class.data?.attributes.title}
                      </h1>
                      <h1 className="text-right font-kanit">
                        {classData.slot.attributes.reservations?.data.length}/
                        {classData.slot.attributes.maxStudents}
                      </h1>
                    </div>
                  );
                })
              ) : (
                <h1 className="text-white">Looks empty here. . .</h1>
              )}
            </div>
          </div>
          <div className="row-span-2 w-full h-full grid place-items-center relative max-h-max">
            <QRCode
              value={`${camperData?.team}0${camperData?.tid}`}
              size={96}
            />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default memo(OnsiteTicket);
