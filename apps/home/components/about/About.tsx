import Image from "next/image";
import Agenda from "../Agenda/Agenda";
import Compilation from "../carousel/Carousel";

const Middle = () => {
  return (
    <div className="relative flex flex-col justify-start items-center bg-gradient-to-b from-[#73DBDD] to-[#26888A]">
      <img
        src="/assets/wave-about.svg"
        className="-translate-y-[74.5%] w-[101%] md:absolute md:top-0 md:inset-x-0 md:scale-y-50"
      />
      <article className="grid place-items-center px-8 md:px-20 xl:px-36 mt-0 mb-12">
        <div
          style={{
            background:
              "linear-gradient(177.91deg, #FFFFFF 28.67%, rgba(255, 255, 255, 0) 83.46%)",
          }}
          className="w-full p-6 md:px-20 md:py-12 rounded-[40px] grid grid-cols-2 gap-y-4 md:mt-12"
        >
          <h1 className="font-chonburi text-4xl md:text-7xl self-center text-black">
            About
          </h1>
          <div className="w-full flex justify-end md:row-span-2 md:w-full md:grid md:place-items-center md:justify-end">
            <div className="w-24 md:w-64 xl:w-96">
              <Image
                src="/assets/tobe-logo.svg"
                width={150}
                height={150}
                layout="responsive"
              />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 font-noto flex flex-col gap-y-2 md:gap-y-4 text-black md:text-xl md:mt-16">
            <p>ToBeIT'67 เสริมความคิด ติดความรู้ ก้าวเข้าสู่ เด็กไอที</p>
            <p>
              กิจกรรมที่จะพาน้องๆ
              ผ่านกิจกรรมการเรียนรู้ผ่านบนโลกออนไลน์และภายในคณะไอที
              เพื่อเสริมความรู้วิชาการเทคโนโลยีสารสนเทศให้แก่ สังคม
            </p>
            <p className="hidden md:inline">
              ขอเชิญชวนน้องๆ ที่มีความสนใจทางด้านเทคโนโลยีสารสนเทศ
              พบปะกับโลกประสบการณ์ทางด้านไอที
              พร้อมกับทักษะด้านไอทีอีกมากมายในค่ายนี้นับไม่ถ้วน
              กิจกรรมมีตลอดทั้งออนไลน์และออนไซต์
            </p>
          </div>
          <div className="col-span-2 flex justify-around items-end md:col-span-1 md:justify-start md:items-center md:gap-x-8">
            <div className="w-20 place-self-center mt-16 md:my-12">
              <Image
                src="/assets/it-kmitl-logo.png"
                alt="it kmitl logo"
                width={90}
                height={90}
                layout="responsive"
              />
            </div>
            <div className="w-20 place-self-center mt-16 md:my-12">
              <Image
                src="/assets/kmitl-logo.png"
                alt="kmitl logo"
                width={90}
                height={90}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      </article>
      <Compilation />
      <Agenda />
    </div>
  );
};

export default Middle;
