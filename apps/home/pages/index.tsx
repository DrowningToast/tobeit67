import type { NextPage } from "next";
import Middle from "../components/about/About";
import BlogBanner from "../components/blog/BlogBanner";
import FAQ from "../components/faq/FAQ";
import Hero from "../components/hero/hero";
import RegisHero from "../components/regis/RegisHero";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import { ConditionalRedirect, firebaseUserAtom } from "../components/firebase";
import { useAtom } from "jotai";
import { NavigationProgress, setNavigationProgress } from "@mantine/nprogress";
import { useEffect } from "react";
import { useScroll } from "framer-motion";

const Home: NextPage = () => {
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    scrollYProgress.onChange((event) => {
      setNavigationProgress(+event.toFixed(2) * 100);
    });
  }, []);
  return (
    <>
      <Head>
        <link rel="icon" type="image/ico" sizes="32x32" href="/favicon.ico" />
      </Head>
      <NextSeo
        title="ToBeIT'67"
        description="ToBeIT'67 เสริมความคิด ติดความรู้ ก้าวเข้าสู่ เด็กไอที กิจกรรมที่จะพาน้องๆ ผ่านกิจกรรมการเรียนรู้ผ่านบนโลกออนไลน์และภายในคณะไอที เพื่อเสริมความรู้วิชาการเทคโนโลยีสารสนเทศให้แก่ส้งคม"
        canonical="https://tobeit.it.kmitl.ac.th"
        openGraph={{
          url: "https://tobeit.it.kmitl.ac.th",
          title: "ค่าย ToBeIT'67",
          description:
            "กิจกรรมที่จะพาน้องๆ ผ่านกิจกรรมการเรียนรู้ผ่านบนโลกออนไลน์และภายในคณะไอที เพื่อเสริมความรู้วิชาการเทคโนโลยีสารสนเทศให้แก่สังคม",
          images: [
            {
              url: "/assets/tobe-logo.svg",
              width: 327,
              height: 327,
              alt: "ToBeIT Logo",
              type: "image/svg",
            },
          ],
        }}
      />
      <NavigationProgress color={"orange"} size={8} />
      <div>
        <Navbar />
        <Hero />
        <Middle />
        <RegisHero />
        <BlogBanner />
        <FAQ />
      </div>
    </>
  );
};

export default Home;
