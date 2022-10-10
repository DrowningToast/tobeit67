import type { NextPage } from "next";
import Middle from "../components/about/About";
import BlogBanner from "../components/blog/BlogBanner";
import FAQ from "../components/faq/FAQ";
import Hero from "../components/hero/hero";
import RegisHero from "../components/regis/RegisHero";

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <Middle />
      <RegisHero />
      <BlogBanner />
      <FAQ />
    </div>
  );
};

export default Home;
