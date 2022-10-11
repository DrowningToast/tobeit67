import Link from "next/link";

const RegisHero = () => {
  return (
    <div className="relative bg-gradient-to-b from-[#006B6C] to-[#051D1E] pb-32">
      <img
        src="/assets/wave-regis.svg"
        alt="wave regis svg"
        className="absolute top-0 transform -translate-y-[99%]"
      />
      <h1 className="font-chonburi text-3xl text-center text-radial my-6">
        ลงทะเบียน
      </h1>
      <div className="flex flex-col justify-center items-center font-chonburi">
        <h3 className="text-2xl">รอบ</h3>
        <h2 className="text-4xl">Online</h2>
        <Link
          passHref
          target={"_blank"}
          href={"https://airtable.com/shryx5STWug0e8WsD"}
        >
          <a target={"_blank"}>
            <button className="text-fresh-salmon bg-white py-4 px-8 text-3xl rounded-full my-4">
              ลงทะเบียน!
            </button>
          </a>
        </Link>
      </div>
      <div className="mx-16 my-8 border-t-2 border-white"></div>
      <div className="flex flex-col justify-center items-center font-chonburi">
        <h3 className="text-2xl">รอบ</h3>
        <h2 className="text-4xl">Onsite</h2>
        <button className="text-fresh-salmon border-8 border-white py-4 px-8 text-xl rounded-full my-4">
          Coming Soon
        </button>
      </div>
    </div>
  );
};

export default RegisHero;
