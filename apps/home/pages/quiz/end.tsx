import { useQuery } from "@apollo/client";
import { useAtom } from "jotai";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import { firebaseUserAtom } from "../../components/firebase";
import {
  fecthQuizzes,
  fetchQuizzesResponse,
  fetchUser,
  fetchUserResponse,
} from "../../gql/query";
import html2canvas from 'html2canvas'

const QuizEnd = () => {
  var test = 'hello world'

  const [hideCert, setHideCert] = useState(false)

  const [fbUser] = useAtom(firebaseUserAtom);
  const { data } = useQuery<fetchUserResponse>(fetchUser(fbUser?.email!), {
    skip: !fbUser?.email,
    onCompleted: (data) => {
      // @ts-ignore-next-line
      window.firstname = data.user.firstname
      // @ts-ignore-next-line
      window.lastname = data.user.lastname

      setTimeout(() => {
        setHideCert(true)
      }, 1000)
    }
  });
  const { data: quizData } = useQuery<fetchQuizzesResponse>(fecthQuizzes, {
    variables: {
      userId: data?.user.id,
    },
  });

  const [certUrl, setCertUrl] = useState('')

  const canvasRef = useRef(null)

  console.log(data);

  useEffect(() => {
    const genCert = async () => {
      const canvas = await html2canvas(canvasRef.current as any, { useCORS: true })
      const image = canvas.toDataURL('image', 1.0)

      setCertUrl(image)
    }

    genCert()
  }, [])

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
          น้องจะต้องได้ขั้นต่ำ <span className="text-glossy-coral">60%</span>{" "}
          ถึงจะได้รับใบประกาศนียบัตร
        </h1>
      </div>
      {/* Image goes here */}
      {hideCert ? (
        <img src={certUrl} />
      ) : (
        <div
          ref={canvasRef}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          id='cert'
        >
          <img
            src="https://i2.paste.pics/d9f3c0afb281a8305fa97d5aaeb78a57.png"
            width="2527"
            height="1785"
          />
          <h1 style={{
            position: 'absolute',
            fontFamily: '"Noto Sans Thai"',
            top: '90%',
            fontSize: 50,
            zIndex: '200'
          }}>
            {/* {window.firstname + " OK2 " + window.lastname} */}
          </h1>
        </div>

      )}

      {/* Download button goes here */}
    </section>
  );
};

export default QuizEnd;
