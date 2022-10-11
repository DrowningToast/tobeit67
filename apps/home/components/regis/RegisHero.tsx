import Link from "next/link";

const RegisHero = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#006B6C] to-[#051D1E] pb-32 md:pb-64">
      <img
        src="/assets/wave-regis.svg"
        alt="wave regis svg"
        className="absolute top-0 transform -translate-y-[99%] md:-translate-y-[75%] md:scale-y-50"
      />
      <h1 className="font-chonburi text-3xl md:text-6xl text-center text-radial my-6 md:col-span-3">
        ลงทะเบียน
      </h1>
      <div className="md:grid md:grid-cols-3 md:px-56">
        <div className="flex flex-col justify-center items-center font-chonburi md:col-start-1">
          <h3 className="text-2xl md:text-3xl">รอบ</h3>
          <h2 className="text-4xl md:text-6xl">Online</h2>
          <Link
            passHref
            target={"_blank"}
            href={"https://airtable.com/shryx5STWug0e8WsD"}
          >
            <a target={"_blank"}>
              <button className="text-fresh-salmon bg-white py-4 px-8 md:py-6 md:px-16 text-3xl md:text-4xl rounded-full my-4 md:my-8">
                ลงทะเบียน!
              </button>
            </a>
          </Link>
        </div>
        <div className="mx-16 my-8 border-t-2 md:border-t-0 md:border-r-4 md:h-72 md:mx-auto md:mt-16 md:py-8 border-white"></div>
        <div className="flex flex-col justify-center items-center font-chonburi">
          <h3 className="text-2xl md:text-3xl">รอบ</h3>
          <h2 className="text-4xl md:text-6xl">Onsite</h2>
          <button className="text-fresh-salmon border-8 border-white py-4 px-8 md:py-6 md:px-16 text-3xl rounded-full my-4 md:my-8">
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisHero;
