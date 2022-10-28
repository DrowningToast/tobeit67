import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { signinWithGooglePopUp } from "../firebase";

const routes = [
  {
    name: "เกี่ยวกับค่ายนี้",
    route: "#about",
  },
  {
    name: "กำหนดการ",
    route: "#agenda",
  },
  {
    name: "ลงทะเบียน",
    route: "#register",
  },
  {
    name: "ออนไซต์",
    route: "/onsite",
  },
  {
    name: "คลังความรู้",
    route: "/blog",
  },
  {
    name: "FAQ",
    route: "#faq",
  },
];

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();

  const router = useRouter();

  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 50,
    stiffness: 200,
  });

  const opacity = useTransform(smoothVelocity, [-300, 0, 300], [0.1, 1, 0.1]);

  return (
    <motion.nav
      style={{ opacity }}
      className="fixed top-0 h-32 w-full z-50 hidden md:flex flex-col items-center justify-center gap-2 drop-shadow-lg"
    >
      <div className="w-4/5 bg-white py-2 px-6 rounded-full">
        <ul className="flex flex-row items-center justify-between px-2 lg:px-12 font-noto text-glossy-coral text-xl lg:text-2xl select-none">
          {routes.map((route, index) => {
            return (
              <li key={index}>
                <p
                  className="cursor-pointer"
                  onClick={async () => {
                    if (route.name === "ออนไซต์") {
                      await signinWithGooglePopUp();
                    }
                    router.push(route.route);
                  }}
                >
                  {route.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
      <hr className="border-2 w-4/5 rounded-full border-white" />
    </motion.nav>
  );
};

export default Navbar;
