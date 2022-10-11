const pairs = [
  {
    question: "จะเข้า On-site ได้ยังไง?",
    answer: "น้องๆ จะต้องเรียนในรอบออนไลน์เพื่อทำควิซและส่งใบสมัคร",
  },
  {
    question: "กิจกรรมจัดกี่โมง?",
    answer: "ไลฟ์ออนไลน์ตั้งแต่เวลา 09:00-16:00 น.",
  },
  {
    question: "จะมีวีดิโอให้ดูย้อนหลังไหม?",
    answer: "วีดีโอย้อนหลังจะอยู่ในกลุ่ม Facebook ToBeIT’67",
  },
];

const FAQ = () => {
  return (
    <section className="bg-gradient-to-b from-[#333333] to-[#0C0C0C] py-16 flex flex-col gap-y-8 px-8 pt-32 relative">
      <img
        src="/assets/wave-faq.svg"
        alt="wave faq svg"
        className="absolute top-0 transform md:w-full -translate-y-[99%] md:-translate-y-[74.5%] md:scale-y-50 left-0"
      />
      <h1 className="font-chonburi text-5xl text-white text-center">FAQ</h1>
      <div className="flex flex-col text-xs gap-y-8 md:gap-y-24">
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
