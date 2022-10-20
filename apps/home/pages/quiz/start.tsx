import { useQuery } from "@apollo/client";
import {
  Affix,
  Button,
  Drawer,
  LoadingOverlay,
  Mark,
  Modal,
  Skeleton,
  Switch,
  Transition,
} from "@mantine/core";
import { useScroll } from "framer-motion";
import { atom, useAtom } from "jotai";
import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { IconArrowUp, IconBook } from "@tabler/icons";
import { firebaseReady, firebaseUserAtom } from "../../components/firebase";
import shuffle from "../../components/misc/shuffle";
import QuizBody from "../../components/quiz/QuizBody";
import {
  fecthQuizzes,
  fetchQuizzesResponse,
  fetchUser,
  fetchUserResponse,
} from "../../gql/query";
import { NavigationProgress, setNavigationProgress } from "@mantine/nprogress";
import { useWindowScroll } from "@mantine/hooks";

export const answersAtom = atom<{
  [id: number]: string;
}>({});

const QuizStart = () => {
  const [fbUser] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);

  // TODO Shuffle
  const { data: userData } = useQuery<fetchUserResponse>(
    fetchUser(fbUser?.email!),
    {
      skip: !(fbUser?.email && ready),
    }
  );

  const { data: quizData } = useQuery<fetchQuizzesResponse>(fecthQuizzes, {
    skip: !userData,
    onCompleted(data) {
      return {
        user: shuffle(data.quizzes),
      };
    },
  });

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
    <section className="bg-water-blue p-6 pb-24 scrollbar-hide min-h-screen relative">
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
            {userData?.user.remainingAttempt}
          </span>{" "}
          ครั้ง
        </h1>
      </div>
      <div className="py-6">
        <Suspense fallback={<Skeleton visible={true} />}>
          {quizData?.quizzes.map((quiz, index) => {
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
      <Drawer
        overlayColor="dark"
        overlayBlur={3}
        overlayOpacity={0.6}
        opened={showDrawer}
        onClose={() => toggleDrawer(false)}
        padding="xl"
        size="lg"
        position="top"
      >
        <h1 className="text-xl md:text-4xl font-bold font-noto">
          ยืนยันคำตอบสุดท้าย
        </h1>
        <div className="flex py-0.5 my-2 items-center gap-x-2">
          <Switch
            color="orange"
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <span className="text-lg font-kanit">
            ข้าพเจ้ายืนยันคำตอบ ได้ตรวจทานว่าได้<Mark>ทำครบทุกข้อแล้ว</Mark>{" "}
            และข้าพเจ้าเข้าใจว่าสามารถส่งคำตอบได้
            <Mark>สูงสุด 3 ครั้งต่อคน</Mark>
            และการส่งครั้งนี้จะเป็นการใช้โควต้าที่ข้าพเจ้านั้นเหลืออยู่
          </span>
        </div>
        <Button
          disabled={!checked}
          classNames={{
            root: "bg-fresh-salmon",
          }}
          className="md:text-2xl text-lg font-bold font-noto text-white w-auto my-8"
          leftIcon={<IconBook size={24} />}
          onClick={async () => {
            if (!checked) return;
          }}
        >
          ยืนยันคำตอบ
        </Button>
      </Drawer>
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
