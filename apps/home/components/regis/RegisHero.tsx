import Link from "next/link";

const RegisHero = () => {
  return (
    <div className="relative">
      {/* <img
        src="/assets/wave-regis.svg"
        alt="wave regis svg"
        className="absolute top-0 transform -translate-y-full"
      /> */}
      <h1 className="font-chonburi text-3xl text-center text-radial">
        ลงทะเบียน
      </h1>
      <div className="flex flex-col justify-center items-center">
        <h3>รอบ</h3>
        <h2>Online</h2>
        <Link
          passHref
          target={"_blank"}
          href={"https://airtable.com/shryx5STWug0e8WsD"}
        >
          <a>
            <button></button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default RegisHero;
