import type { NextPage } from "next";
import Middle from "../components/about/About";
import Hero from "../components/hero/hero";
import RegisHero from "../components/regis/RegisHero";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <Middle />
      <RegisHero />
    </div>
  );
};

export default Home;
