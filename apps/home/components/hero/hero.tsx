import { motion, useScroll, useTransform } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { firebaseUserAtom, signinWithGooglePopUp } from "../firebase";

const Hero = () => {
  const { scrollY } = useScroll();
  const dy = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 300], [0.35, 0.8]);

  const [user] = useAtom(firebaseUserAtom);
  const router = useRouter();

  return (
    <section className="overflow-x-hidden overflow-y-hidden bg-gradient-to-t from-[#007577] via-[#007577] to-[#FB8763] w-full flex flex-col md:grid md:grid-cols-2 justify-center gap-y-4 px-8 md:px-32 pt-36 md:pt-52 md:mb-12 relative">
      {/* Title */}
      <img
        className="self-end md:col-start-2"
        src="/assets/tobeit67.svg"
        alt="ToBeIT'67"
      />
      {/* Clouds A */}
      <motion.img
        style={{
          y: dy,
          opacity,
        }}
        animate={{
          x: ["0%", "100%"],
          transition: {
            ease: "linear",
            duration: 60,
            repeat: Infinity,
          },
        }}
        src="/assets/clouds.svg"
        alt="clouds svg"
        className="absolute top-6 md:top-0 inset-x-0 md:w-full"
      />
      {/* Clouds B */}
      <motion.img
        style={{
          y: dy,
          opacity,
        }}
        animate={{
          x: ["-100%", "0%"],
          transition: {
            ease: "linear",
            duration: 60,
            repeat: Infinity,
          },
        }}
        src="/assets/clouds.svg"
        alt="clouds svg"
        className="absolute top-6 md:top-0 inset-x-0 md:w-full"
      />
      <div className="md:col-start-2 flex flex-col gap-y-4">
        <Link
          passHref
          target="_blank"
          href="https://airtable.com/shrbQ9EDBNvCa0Ypr"
        >
          <motion.button
            animate={{
              scale: [1, 1.025, 1],
              transition: {
                type: "spring",
                repeat: Infinity,
                repeatDelay: 0.1,
              },
            }}
            className=" md:py-3 lg:mx-14 bg-glossy-coral font-kanit font-bold text-center inline-block w-full md:w-auto py-2 rounded-full shadow-2xl text-white text-lg tracking-widest"
          >
            <a>ลงทะเบียนรอบออนไซต์!</a>
          </motion.button>
        </Link>

        <motion.button
          onClick={() => {
            if (user) return router.push("/onsite");
            signinWithGooglePopUp(() => router.push("/onsite"));
          }}
          animate={{
            scale: [1, 1.025, 1],
            transition: {
              type: "spring",
              repeat: Infinity,
              repeatDelay: 0.1,
            },
          }}
          className="md:py-3 lg:mx-14 bg-glossy-coral font-kanit font-bold text-center inline-block w-full md:w-auto py-2 rounded-full shadow-2xl text-white text-lg tracking-widest"
        >
          <a>ดูบัตรรอบออนไซต์</a>
        </motion.button>
      </div>

      {/* Octopus */}
      <img className="mt-6 z-20 md:hidden" src="/assets/octopus.svg" />
      <img
        src="/assets/octopus-lg.svg"
        className="z-20 md:row-start-1 md:row-span-4 md:w-full md:scale-125 md:transform md:translate-y-2 hidden md:block"
      />
    </section>
  );
};

export default Hero;
