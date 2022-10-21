import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { firebaseUserAtom } from "../../components/firebase";
import {
  fecthQuizzes,
  fetchQuizzesResponse,
  fetchUser,
  fetchUserResponse,
} from "../../gql/query";
import cert from "../../components/quiz/cert.png";
import { useRouter } from "next/router";
import { Skeleton } from "@mantine/core";

const QuizEnd = () => {
  const [certUrl, setCertUrl] = useState<string | null | undefined>(null);

  const [fbUser] = useAtom(firebaseUserAtom);
  const { data } = useQuery<fetchUserResponse>(fetchUser(fbUser?.email!), {
    skip: !fbUser?.email,
  });
  const { data: quizData } = useQuery<fetchQuizzesResponse>(fecthQuizzes, {
    variables: {
      userId: data?.user.id,
    },
  });

  const router = useRouter();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      !data?.user.firstname ||
      !(data.user.scorePercent > +process.env.NEXT_PUBLIC_MIN_THRESHOLD!)
    )
      return;

    const genCert = async () => {
      let context = canvasRef.current?.getContext("2d");
      if (!context) return;

      let drawing = new Image();
      drawing.src = cert.src;

      drawing.onload = () => {
        context?.drawImage(drawing, 0, 0, 1119, 725);
        context!.textAlign = "center";
        context!.font = "48px Noto Sans Thai";
        context?.fillText(
          `${data?.user.firstname} ${data?.user.lastname}`,
          550,
          310
        );
        setCertUrl(canvasRef.current?.toDataURL("image/png"));
      };
    };

    genCert();
  }, [data?.user]);

  return (
    <section className="min-h-screen bg-water-blue px-12 py-16">
      <NextSeo
        title="ToBeIT'67 | Quiz"
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
      <div>
        <Link href="/quiz" passHref>
          <a className="underline text-white opacity-70 md:text-xl font-noto font-light">
            กลับ
          </a>
        </Link>
      </div>
      <div className="w-full flex justify-center items-center gap-y-4 text-white md:text-3xl font-bold font-noto flex-col my-12">
        <h1>
          น้องสอบได้คะแนน{" "}
          <span className="text-glossy-coral">{data?.user.score}</span>/
          {quizData?.quizzes.length} !
        </h1>
        <h1>
          นับว่าเป็น{" "}
          <span className="text-glossy-coral">
            {data?.user?.scorePercent! * 100}%
          </span>{" "}
          จากคะแนนเต็ม
        </h1>
        <h1>
          น้องจะต้องได้ขั้นต่ำ{" "}
          <span className="text-glossy-coral">
            {(+process.env.NEXT_PUBLIC_MIN_THRESHOLD! * 100).toFixed(0)}%
          </span>{" "}
          ถึงจะได้รับใบประกาศนียบัตร
        </h1>
      </div>
      {/* Image goes here */}
      <div className="lg:px-48">
        <Skeleton visible={Boolean(data?.user)} animate>
          <canvas
            width={1119}
            height={725}
            ref={canvasRef}
            color="black"
            className="w-full h-full"
          />
        </Skeleton>
      </div>
      {/* Download button goes here */}
      <div className="flex flex-col items-center">
        <Skeleton
          className="w-auto my-8 mx-auto inline-block"
          visible={!certUrl}
        >
          <a
            target={"_blank"}
            download={"certificate.png"}
            href={certUrl!}
            className="text-center underline font-noto md:text-2xl inline-block w-full"
          >
            ดาวน์โหลด Certificate
          </a>
        </Skeleton>
      </div>
    </section>
  );
};

export default QuizEnd;
