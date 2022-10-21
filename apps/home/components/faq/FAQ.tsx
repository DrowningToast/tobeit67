import Link from "next/link";

const pairs = [
  {
    question: "โครงการ ToBeIT'67 คืออะไร",
    answer:
      "โครงการที่จะทำให้น้องๆ ได้มารู้จักกับคณะไอทีลาดกระบังมากขึ้นผ่านการเรียนรู้เนื้อหาพื้นฐานของไอที ทดลองพัฒนาโปรเจกต์ร่วมกับเพื่อนใหม่ และทำกิจกรรมร่วมกับพี่ๆ จากคณะไอทีลาดกระบัง",
  },
  {
    question: "โครงการ ToBeIT'67 รอบออนไลน์จัดขึ้นที่ไหน และวันที่เท่าไหร่",
    answer:
      "โครงการ ToBeIT'67 รอบออนไลน์จะมีการถ่ายทอดสดที่ Facebook group ToBeIT'67 ในวันที่ 15, 16, 22 และ 23 ตุลาคม 2565",
  },
  {
    question: "โครงการ ToBeIT'67 รอบออนไซต์จัดขึ้นที่ไหน และวันที่เท่าไหร่",
    answer:
      "โครงการ ToBeIT'67 จัดขึ้นที่คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ในวันที่ 29 - 30 ตุลาคม และ 5 - 6 พฤศจิกายน 2565",
  },
  {
    question: "สามารถสมัครเข้าร่วมโครงการ ToBeIT'67 รอบออนไซต์ได้ที่ไหน",
    answer: (
      <span>
        น้องๆ สามารถสมัครเข้าร่วมโครงการ ToBeIT'67 รอบออนไซต์ได้ที่
        <Link href="https://airtable.com/shrbQ9EDBNvCa0Ypr" passHref>
          <a className="underline text-blue-400" target={"_blank"}>
            ตรงนี้
          </a>
        </Link>
      </span>
    ),
  },
];

const FAQ = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#333333] to-[#0C0C0C] py-16 flex flex-col gap-y-8 px-8 pt-32 relative"
      id="faq"
    >
      <img
        src="/assets/wave-faq.svg"
        alt="wave faq svg"
        className="absolute top-0 transform md:w-full -translate-y-[99%] md:-translate-y-[74.5%] md:scale-y-50 left-0"
      />
      <h1 className="font-chonburi text-5xl text-white text-center">FAQ</h1>
      <div className="flex flex-col text-xs gap-y-8 md:gap-y-24 text-white">
        {pairs.map((pair, index) => {
          return (
            <div
              key={`faq-${index}`}
              className="text-center font-chonburi flex flex-col gap-y-1 md:gap-y-4"
            >
              <h5 className="underline md:text-4xl">Q</h5>
              <p className="font-noto md:text-2xl">{pair.question}</p>
              <h5 className="underline md:text-4xl">A</h5>
              <p className="font-noto md:text-2xl">{pair.answer}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
