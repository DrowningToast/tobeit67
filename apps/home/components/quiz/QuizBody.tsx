import { Button, Modal, Skeleton } from "@mantine/core";
import { useAtom } from "jotai";
import { FC, memo, Suspense, useEffect, useMemo, useState } from "react";
import { quiz } from "../../gql/query";
import { answersAtom } from "../../pages/quiz/start";
import shuffle from "../misc/shuffle";
import ReactMarkdown from "react-markdown";

interface Props {
  index: number;
  quiz: quiz;
  choices: string[];
}

const QuizBody: FC<Props> = ({ index, quiz, choices }) => {
  const [showModal, setModal] = useState<`${number}-${number}` | null>(null);
  const [selectedAnswers, setAnswers] = useAtom(answersAtom);

  const shuffleChoices = useMemo(() => {
    return shuffle(choices);
  }, []);

  return (
    <div key={index} className="px-2 md:px-12 flex flex-col">
      <h1 className="text-black text-2xl md:text-4xl font-noto font-bold text-left">
        Quiz: {index + 1}
      </h1>
      <div className="prose font-noto mt-12 lg:prose-xl mx-auto flex flex-col w-full">
        <ReactMarkdown className="">{quiz.question}</ReactMarkdown>
      </div>
      {/* Pic */}
      <div className="w-full flex flex-col gap-y-4 realtive my-8 md:px-24">
        {quiz.ref?.length > 0 &&
          quiz.ref.map((url, _) => {
            return (
              <>
                <Suspense fallback={<Skeleton visible />}>
                  <img
                    key={`pic-${index}-${_}`}
                    onClick={() => setModal(`${index}-${_}`)}
                    className="rounded-xl cursor-pointer"
                    src={`${
                      process.env.NEXT_PUBLIC_CMS_DEV ??
                      process.env.NEXT_PUBLIC_CMS_PROD
                    }${url}`}
                  />
                  <Modal
                    centered
                    size={"1x"}
                    key={`modal-${index}-${_}`}
                    opened={`${index}-${_}` === showModal}
                    onClose={() => setModal(null)}
                    title={`Quiz No. ${index + 1}, Pic ${_ + 1}`}
                    classNames={{
                      body: "mx-4",
                    }}
                  >
                    <img
                      className="rounded-xl"
                      src={`${
                        process.env.NEXT_PUBLIC_CMS_DEV ??
                        process.env.NEXT_PUBLIC_CMS_PROD
                      }${url}`}
                    />
                  </Modal>
                </Suspense>
              </>
            );
          })}
      </div>
      {/* Choices */}
      <div className="flex flex-col gap-y-4">
        {shuffleChoices.map((quizChoice, _) => {
          return (
            <Button
              onClick={() => {
                setAnswers({
                  ...selectedAnswers,
                  [`${quiz.id - 1}`]: {
                    id: quiz.id,
                    answer: `${quizChoice}`,
                  },
                });
              }}
              className={`w-full border-glossy-coral border-2 rounded-xl md:text-2xl font-semibold text-left px-8 py-2 h-12 flex-start ${
                quizChoice === selectedAnswers[quiz.id - 1]?.answer
                  ? "bg-blue-500 text-white"
                  : "text-glossy-coral"
              }`}
              key={`quiz-choice-${index}-${_}`}
            >
              {String.fromCharCode(65 + _)}: {quizChoice}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(QuizBody);
