const Hero = () => {
  return (
    <section className="bg-gradient-to-t from-[#007577] via-[#007577] to-[#FB8763] w-full flex flex-col md:grid md:grid-cols-2 justify-center gap-y-4 px-8 md:px-32 pt-36 md:pt-52 relative">
      {/* Title */}
      <img
        className="self-end md:col-start-2"
        src="/assets/tobeit67.svg"
        alt="ToBeIT'67"
      />
      {/* Clouds */}
      <img
        src="/assets/clouds.svg"
        alt="clouds svg"
        className="absolute top-0 inset-x-0 md:w-full"
      />
      <button className="md:col-start-2 md:py-3 md:mx-14 bg-glossy-coral font-kanit font-bold text-center inline-block w-full md:w-auto py-2 rounded-full shadow-2xl text-white text-lg tracking-widest">
        ไปลงทะเบียน!
      </button>
      <a
        href="#onsite"
        className="md:col-start-2 opacity-70 underline text-white text-center font-noto cursor-pointer"
      >
        วิธีลงทะเบียนรอบออนไซต์
      </a>
      {/* Octopus */}
      <img className="mt-6 z-20 md:hidden" src="/assets/octopus.svg" />
      <img
        src="/assets/octopus-lg.svg"
        className="z-20 md:row-start-2 md:row-span-3 md:w-full md:scale-150 md:transform md:-translate-y-36"
      />
    </section>
  );
};

export default Hero;
