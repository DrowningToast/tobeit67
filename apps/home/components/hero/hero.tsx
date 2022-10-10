const Hero = () => {
  return (
    <section className="bg-gradient-to-t from-[#007577] via-[#007577] to-[#FB8763] w-full flex flex-col justify-center gap-y-4 px-8 pt-36 relative">
      {/* TItle */}
      <img className="self-end" src="/assets/tobeit67.svg" alt="ToBeIT'67" />
      {/* Clouds */}
      <img
        src="/assets/clouds.svg"
        alt="clouds svg"
        className="absolute top-0 inset-x-0"
      />
      <button className="bg-glossy-coral font-kanit font-bold text-center inline-block w-full py-2 rounded-full shadow-2xl text-white text-lg tracking-widest">
        ไปลงทะเบียน!
      </button>
      <a
        href="#onsite"
        className="opacity-70 underline text-white text-center font-noto"
      >
        วิธีลงทะเบียนรอบออนไซต์
      </a>
      <img className="mt-6 z-20" src="/assets/octopus.svg" />
    </section>
  );
};

export default Hero;
