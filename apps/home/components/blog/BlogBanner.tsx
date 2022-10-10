const BlogBanner = () => {
  return (
    <section className="bg-gradient-to-b from-[#FB8763] to-[#D54962] pb-28 pt-8 flex flex-col gap-y-6 relative">
      <img
        src="/assets/wave-challenger.svg"
        alt="wave challenger svg"
        className="absolute top-0 transform -translate-y-[99%] left-0"
      />
      <h1 className="text-white font-chonburi text-4xl text-center ">
        Challenger Deep
      </h1>
      <button className="inline-block p-2 mx-32 text-xl font-chonburi text-glossy-coral bg-white rounded-full shadow-xl">
        ไปอ่านเพิ่ม
      </button>
    </section>
  );
};

export default BlogBanner;
