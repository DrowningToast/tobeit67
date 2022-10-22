import { useMutation } from "@apollo/client";
import { Button, Drawer, LoadingOverlay, Mark, Switch } from "@mantine/core";
import { IconBook } from "@tabler/icons";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction } from "react";
import { fetchUserResponse, submitQuizzes } from "../../gql/query";
import { answersAtom } from "../../pages/quiz/start";

interface Props {
  showDrawer: boolean;
  toggleDrawer: Dispatch<SetStateAction<boolean>>;
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  userData: fetchUserResponse | undefined;
}

const QuizConfirm: FC<Props> = ({
  showDrawer,
  toggleDrawer,
  checked,
  setChecked,
  userData,
}) => {
  const [selectedAnswers, setAnswers] = useAtom(answersAtom);

  const [submitAnswers, { data, loading }] = useMutation(submitQuizzes);

  const router = useRouter();

  return (
    <Drawer
      overlayColor="dark"
      overlayBlur={3}
      overlayOpacity={0.6}
      opened={showDrawer}
      onClose={() => {
        toggleDrawer(false);
        setChecked(false);
      }}
      padding="xl"
      size="lg"
      position="top"
    >
      <LoadingOverlay visible={loading} />
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
          try {
            if (!checked) return;

            const formatAnswers = [];
            for (const [key, value] of Object.entries(selectedAnswers)) {
              formatAnswers.push(value);
            }

            await submitAnswers({
              variables: {
                userId: userData?.user.id,
                answers: formatAnswers,
              },
            });

            router.push("/quiz/end");
          } catch (e) {
            if (
              confirm(
                "Something went wrong while submitting the answers! Please contact the staff. Do you want to go to home page? (this will reset your answers, but you get to go check the your answer quota)"
              )
            ) {
              router.push("/");
            }
          }
        }}
      >
        ยืนยันคำตอบ
      </Button>
    </Drawer>
  );
};
export default QuizConfirm;
