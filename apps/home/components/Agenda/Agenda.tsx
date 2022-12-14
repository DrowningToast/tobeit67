import { Timeline } from "@mantine/core";
import { useMemo } from "react";

const events = [
  {
    date: "วันนี้ - 21 ต.ค.",
    title: "เปิดรับสมัครออนไลน์",
    time: 0,
  },
  {
    date: "14 ต.ค.",
    title: "First Meet สำหรับกิจกรรม Online",
    time: new Date(2022, 9, 14),
  },
  {
    date: "15 - 16 ต.ค.",
    title: "กิจกรรม Online Day 1-2",
    time: new Date(2022, 9, 15),
  },
  {
    date: "16 - 24 ต.ค.",
    title: "เปิดรับสมัครรอบออนไซต์",
    time: new Date(2022, 9, 16),
  },
  {
    date: "22 - 23 ต.ค.",
    title: "กิจกรรม Online Day 3-4",
    time: new Date(2022, 9, 22),
  },
  {
    date: "22 - 26 ต.ค.",
    title: "ประกาศและยืนยันสิทธิ์เข้ากิจกรรม Onsite",
    time: new Date(2022, 9, 22),
  },
  {
    date: "26 ต.ค.",
    title: "First Meet สำหรับกิจกรรม Onsite",
    time: new Date(2022, 9, 26),
  },
  {
    date: "29 - 30 ต.ค.",
    title: "Day 1 - 2 (Onsite)",
    time: new Date(2022, 9, 29),
  },
  {
    date: "5 - 6 พ.ย.",
    title: "Day 3 - 4 (Onsite)",
    time: new Date(2022, 10, 3),
  },
];

const Agenda = () => {
  const today = useMemo(() => {
    return new Date();
  }, []);

  const activeIndex = useMemo(() => {
    return events.reduce((prev, current) => {
      if (today >= current.time) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);
  }, []);

  return (
    <div className="px-8 pb-48 md:mx-auto md:mb-32" id="agenda">
      <h1 className="font-chonburi text-3xl md:text-5xl text-center text-white my-8">
        Agenda
      </h1>
      <Timeline
        color="orange"
        bulletSize={30}
        active={activeIndex - 1}
        lineWidth={4}
        classNames={{
          itemTitle: `font-noto font-bold text-lg  text-white md:mb-10`,
          item: `flex flex-col gap-y-2 py-1 md:translate-x-1/2`,
          itemBullet: ``,
        }}
      >
        {events.map((event, index) => {
          return (
            <Timeline.Item key={index} title={event.date}>
              <div
                className={`${
                  index % 2 === 0
                    ? "md:-translate-x-full md:-left-6 md:top-0"
                    : "md:left-6 md:top-8"
                } md:absolute md:w-[360px] lg:w-[450px] md:max-w-none max-w-sm px-8 bg-white rounded-full text-center font-chonburi font-bold py-1 text-fresh-salmon text-sm md:text-base lg:text-xl`}
              >
                {event.title}
              </div>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </div>
  );
};

export default Agenda;
