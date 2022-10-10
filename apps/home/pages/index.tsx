import type { NextPage } from "next";
import Middle from "../components/about/About";
import Hero from "../components/hero/hero";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <Middle />
    </div>
  );
};

export default Home;
