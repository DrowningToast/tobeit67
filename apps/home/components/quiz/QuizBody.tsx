import { Button, Modal, Skeleton } from "@mantine/core";
import { useAtom } from "jotai";
import { FC, memo, Suspense, useEffect, useMemo, useState } from "react";
import { quiz } from "../../gql/query";
import { answersAtom } from "../../pages/quiz/start";
import shuffle from "../misc/shuffle";

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
    <div key={index} className="px-2 md:px-12">
      <h1 className="text-2xl md:text-4xl font-noto font-bold">
        Quiz: {index + 1}
      </h1>
      <p className="text-lg md:text-xl my-2 font-noto">{quiz.question}</p>
      {/* Pic */}
      <div className="w-full flex flex-col gap-y-4 realtive my-8 md:px-24">
        {quiz.ref.length > 0 &&
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
                  [`${quiz.id}`]: `${quizChoice}`,
                });
              }}
              className={`w-full border-white border-2 rounded-xl md:text-2xl font-semibold text-left px-8 py-2 h-12 flex-start ${
                quizChoice === selectedAnswers[quiz.id] ? "bg-blue-500" : ""
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
