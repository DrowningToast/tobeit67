import Image from "next/image";
import Agenda from "../Agenda/Agenda";
import Compilation from "../carousel/Carousel";

const Middle = () => {
  return (
    <div className="relative flex flex-col justify-start bg-gradient-to-b from-[#73DBDD] to-[#26888A]">
      <img
        src="/assets/wave-about.svg"
        className="-translate-y-[99%] w-[101%]"
      />
      <article className="grid place-items-center px-8 mt-0 mb-12">
        <div
          style={{
            background:
              "linear-gradient(177.91deg, #FFFFFF 28.67%, rgba(255, 255, 255, 0) 83.46%)",
          }}
          className="w-full p-6 rounded-[40px] grid grid-cols-2 gap-y-4"
        >
          <h1 className="font-chonburi text-4xl self-center text-black">
            About
          </h1>
          <div className="w-full flex justify-end">
            <div className="w-24">
              <Image
                src="/assets/tobe-logo.png"
                width={75}
                height={75}
                layout="responsive"
                className="w-20"
              />
            </div>
          </div>
          <div className="col-span-2 font-noto flex flex-col gap-y-2 text-black">
            <p>ToBeIT'67 เสริมความคิด ติดความรู้ ก้าวเข้าสู่ เด็กไอที</p>
            <p>
              กิจกรรมที่จะพาน้องๆ
              ผ่านกิจกรรมการเรียนรู้ผ่านบนโลกออนไลน์และภายในคณะไอที
              เพื่อเสริมความรู้วิชาการเทคโนโลยีสารสนเทศให้แก่ ส้งคม
            </p>
          </div>
          <div className="w-20 place-self-center mt-16">
            <Image
              src="/assets/it-kmitl-logo.png"
              alt="it kmitl logo"
              width={90}
              height={90}
              layout="responsive"
            />
          </div>
          <div className="w-20 place-self-center mt-16">
            <Image
              src="/assets/kmitl-logo.png"
              alt="kmitl logo"
              width={90}
              height={90}
              layout="responsive"
            />
          </div>
        </div>
      </article>
      <Compilation />
      <Agenda />
    </div>
  );
};

export default Middle;
