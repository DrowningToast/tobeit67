import Link from "next/link";

const RegisHero = () => {
  return (
    <div
      className="relative bg-gradient-to-b from-[#006B6C] to-[#051D1E] pb-32 "
      id="register"
    >
      <img
        src="/assets/wave-regis.svg"
        alt="wave regis svg"
        className="absolute top-0 transform md:w-full -translate-y-[99%] md:-translate-y-[74.9%] md:scale-y-50"
      />
      <h1 className="font-chonburi text-3xl md:text-6xl text-center text-white my-6 md:col-span-3">
        ลงทะเบียน
      </h1>
      <div className="lg:grid lg:grid-cols-3 md:px-56 sm:px-32">
        <div className="flex flex-col justify-center items-center font-chonburi md:col-start-1">
          <h3 className="text-2xl lg:text-3xl text-white">รอบ</h3>
          <h2 className="text-4xl lg:text-6xl text-white">Online</h2>
          <Link
            passHref
            target={"_blank"}
            href={"https://airtable.com/shryx5STWug0e8WsD"}
          >
            <a target={"_blank"}>
              <button className="text-fresh-salmon border-8 border-white py-4 px-8 md:py-6 md:px-16 text-xl md:text-3xl lg:text-4xl rounded-full my-4 md:my-8">
                รอบ Online
              </button>
            </a>
          </Link>
        </div>
        <div className="mx-16 my-8 border-t-2 lg:border-t-0 lg:border-r-4 lg:h-72 lg:mx-auto lg:mt-16 lg:py-8 border-white"></div>
        <div className="flex flex-col justify-center items-center font-chonburi">
          <h3 className="text-2xl lg:text-3xl text-white">รอบ</h3>
          <h2 className="text-4xl lg:text-6xl text-white">Onsite</h2>
          <Link
            passHref
            href="https://airtable.com/shrbQ9EDBNvCa0Ypr"
            target="_blank"
          >
            <a>
              <button className="text-fresh-salmon bg-white py-4 px-8 md:py-6 md:px-16 text-xl md:text-3xl lg:text-4xl rounded-full my-4 md:my-8">
                สมัครเลย!
              </button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisHero;
