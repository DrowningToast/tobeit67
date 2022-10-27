import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "react-qr-code";
import { Classroom, ClassSlotsDatum } from "../../gql/types/ClassData";

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
}> = ({ fliped, shownClasses }) => {
  if (shownClasses[0]) console.log(shownClasses[0].slot);

  return (
    <AnimatePresence mode="wait">
      {!fliped ? (
        <motion.main
          key={"front"}
          variants={variant}
          initial="first"
          animate="second"
          exit="third"
          className="shadow-lg rounded-xl bg-white aspect-[0.49] w-full grid grid-rows-[repeat(7,_minmax(0,_1fr))] overflow-hidden"
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
            <div className="justify-self-end text-center text-lg py-2 font-chonburi bg-2B">
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
          className="shadow-lg rounded-xl bg-white aspect-[0.49] w-full grid grid-rows-[repeat(7,_minmax(0,_1fr))] overflow-hidden"
        >
          <div className="row-span-5 grid place-items-center relative px-6 w-full h-full  border-b-4 border-dashed border-2B">
            <div className="absolute inset-2 bg-2B rounded-xl px-4 py-4">
              {/* Display all classes */}
              {shownClasses?.map((classData, index) => (
                <div
                  key={`class-${index}`}
                  className="grid grid-cols-4 grid-rows-1"
                >
                  <span className="col-span-4 text-sm">
                    {classData.class.data.attributes.teacher} / ห้อง{" "}
                    {classData.slot.attributes.classNumber}
                  </span>
                  <h1 className="col-span-3 font-semibold">
                    {classData.class.data.attributes.title}
                  </h1>
                  <h1 className="text-right">
                    {classData.slot.attributes.reservations?.data.length}/
                    {classData.slot.attributes.maxStudents}
                  </h1>
                </div>
              ))}
            </div>
          </div>
          <div className="row-span-2 w-full h-full grid place-items-center relative max-h-max">
            <QRCode value="A1" size={96} />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default OnsiteTicket;
