import { useMutation, useQuery } from "@apollo/client";
import {
  Affix,
  Button,
  LoadingOverlay,
  Skeleton,
  Transition,
} from "@mantine/core";
import { useScroll } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { IconArrowUp } from "@tabler/icons";
import { firebaseReady, firebaseUserAtom } from "../../components/firebase";
import shuffle from "../../components/misc/shuffle";
import QuizBody from "../../components/quiz/QuizBody";
import {
  fecthQuizzes,
  fetchQuizzesResponse,
  fetchUser,
  fetchUserResponse,
  submitQuizzes,
} from "../../gql/query";
import { NavigationProgress, setNavigationProgress } from "@mantine/nprogress";
import { useWindowScroll } from "@mantine/hooks";
import QuizConfirm from "../../components/quiz/QuizConfirm";
import { NextSeo } from "next-seo";

export const answersAtom = atom<{
  [id: number]: {
    id: number;
    answer: string;
  };
}>({});

const QuizStart = () => {
  const [fbUser] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);

  const { data: userData } = useQuery<fetchUserResponse>(
    fetchUser(fbUser?.email!),
    {
      skip: !(fbUser?.email && ready),
    }
  );

  const { data: quizData } = useQuery<fetchQuizzesResponse>(fecthQuizzes, {
    skip: !userData?.user,
    variables: {
      userId: userData?.user.id,
    },
    onCompleted(data) {
      return {
        quizzes: shuffle(data.quizzes),
      };
    },
  });

  const shuffledQuizzes = useMemo(() => {
    if (!quizData || quizData?.quizzes?.length <= 1) return quizData;

    console.log(shuffle(Array(...quizData?.quizzes!)));

    return { quizzes: shuffle(Array(...quizData?.quizzes!)) };
  }, [quizData]);

  const isLoading = useMemo(() => {
    return !(userData && fbUser && ready && quizData?.quizzes);
  }, [userData, quizData?.quizzes, ready, fbUser]);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    scrollYProgress.onChange((event) => {
      setNavigationProgress(+event.toFixed(2) * 100);
    });
  }, []);

  const [scroll, scrollTo] = useWindowScroll();
  const [showDrawer, toggleDrawer] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);

  return (
    <section className="text-white bg-water-blue p-6 pb-24 scrollbar-hide min-h-screen relative">
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
      <LoadingOverlay visible={isLoading} />
      <NavigationProgress color={"orange"} size={8} />
      <Link passHref href="/">
        <a className="text-gray-300 underline font-noto justify-self-start xl:text-xl">
          กลับ
        </a>
      </Link>
      <div className="py-6">
        <h1 className="font-bold md:text-3xl text-xl font-noto text-center">
          น้อง ๆ จะต้องทำให้เสร็จภายในคราวเดียว
        </h1>
        <h1 className="font-bold md:text-3xl text-xl font-noto text-center">
          หากน้อง ๆ ปิดหน้านี้{" "}
          <span className="text-glossy-coral underline">คำตอบจะหายหมด</span>
        </h1>
        <h1 className="font-bold md:text-3xl text-xl font-noto text-center">
          ยังสามารถสอบได้อีก{" "}
          <span className="text-glossy-coral">
            {userData?.user?.remainingAttempt}
          </span>{" "}
          ครั้ง
        </h1>
      </div>
      <div className="py-6 flex flex-col gap-y-16">
        <Suspense fallback={<Skeleton visible={true} />}>
          {shuffledQuizzes?.quizzes.map((quiz, index) => {
            return (
              <QuizBody
                key={`quizbody-${index}`}
                choices={[
                  quiz.choiceA,
                  quiz.choiceB,
                  quiz.choiceC,
                  quiz.choiceD,
                ]}
                index={index}
                quiz={quiz}
              />
            );
          })}
        </Suspense>
      </div>
      <div className="flex flex-col px-12">
        <Button
          onClick={() => toggleDrawer(!showDrawer)}
          className=" bg-fresh-salmon rounded-lg text-center md:text-3xl font-bold font-noto h-16 mx-12"
        >
          ส่งคำตอบ
        </Button>
      </div>
      <QuizConfirm
        showDrawer={showDrawer}
        toggleDrawer={toggleDrawer}
        checked={checked}
        setChecked={setChecked}
        userData={userData}
      />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 200}>
          {(transitionStyles) => (
            <Button
              classNames={{
                root: "bg-fresh-salmon",
              }}
              leftIcon={<IconArrowUp size={16} />}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </section>
  );
};

export default QuizStart;
