import Link from "next/link";

const BlogBanner = () => {
  return (
    <section className="bg-gradient-to-b from-[#FB8763] to-[#D54962] pb-28 md:pb-64 pt-8 md:pt-20 flex flex-col gap-y-6 md:gap-y-16 relative mt-8 md:mt-0">
      <img
        src="/assets/wave-challenger.svg"
        alt="wave challenger svg"
        className="absolute top-0 transform -translate-y-[99%] md:-translate-y-[74.9%] left-0 md:scale-y-50 w-full"
      />
      <h1 className="text-white font-chonburi text-4xl text-center md:text-7xl ">
        เนื้อหาน่าสนใจ
      </h1>
      <Link href="/blog">
        <button className="inline-block p-2 px-6 md:px-12 md:py-6 mx-24 md:w-80 md:mx-auto text-xl md:text-4xl font-chonburi text-glossy-coral bg-white rounded-full shadow-xl">
          อ่านเพิ่มเติม
        </button>
      </Link>
    </section>
  );
};

export default BlogBanner;
