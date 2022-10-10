import Image from "next/image";
import Agenda from "../Agenda/Agenda";
import Compilation from "../carousel/Carousel";

const Middle = () => {
  return (
    <div
      //   style={{
      //     background: "linear-gradient(180deg, #73DBDD 25.31%, #26888A 73.23%)",
      //   }}
      className="relative bg-gradient-to-b from-[#73DBDD] to-[#26888A]"
    >
      <img
        src="/assets/wave-about.svg"
        className="absolute top-0 -translate-y-full"
      />
      <article className="grid place-items-center px-8 my-12">
        <div
          style={{
            background:
              "linear-gradient(177.91deg, #FFFFFF 28.67%, rgba(255, 255, 255, 0) 83.46%)",
          }}
          className="w-full p-6 rounded-[40px] grid grid-cols-2 gap-y-4"
        >
          <h1 className="font-chonburi text-4xl self-center">About</h1>
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
          <div className="col-span-2 font-noto flex flex-col gap-y-2">
            <p>
              พบกันอีกครั้งกับงาน ToBeIT'67 เสริมความคิด ติดความรู้ ก้าวเข้าสู่
              เด็กไอที 💫
            </p>
            <p>
              ขอเชิญชวนน้องๆ ที่มีความสนใจทางด้านเทคโนโลยีสารสนเทศ
              พบปะกับโลกประสบการณ์ทางด้านไอที
              พร้อมกับทักษะด้านไอทีอีกมากมายในค่ายนี้นับไม่ถ้วน
              กิจกรรมมีตลอดทั้งออนไลน์และออนไซต์
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
