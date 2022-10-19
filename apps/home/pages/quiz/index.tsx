import { LoadingOverlay } from "@mantine/core";
import { MainBase } from "airtable-api";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { firebaseReady, firebaseUserAtom } from "../../components/firebase";
import QuizNavbar from "../../components/quiz/QuizNavbar";
import Link from "next/link";

const Quiz: NextPage = () => {
  // When validation is check
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  // Check if user exists in airtable
  const [validData, setValidData] = useState(true);

  // Fetch to find out remaining attempt
  // TODO

  const router = useRouter();

  console.log(`${user} ${ready} ${!validData || !ready}`);

  useEffect(() => {
    if (!user) return;

    MainBase.table<{
      Email: string;
    }>("Camper-Register")
      .select({
        fields: ["Email"],
        filterByFormula: `Email= "${user?.email}"`,
      })
      .all()
      .then((emails) => {
        setValidData(
          emails.find((record) => record.fields.Email === user?.email)
            ? true
            : false
        );
      });
  }, [user]);

  // Deal with unknown user
  useEffect(() => {
    if (!validData && ready) {
      alert("ไม่พบชื่อในระบบ กรุณาลงทะเบียนรอบออนไลน์ก่อน");
      router.push("/signout");
    }
  }, [validData, ready]);

  return (
    <section className="relative min-h-screen bg-water-blue">
      <LoadingOverlay visible={!validData || !ready || !user} overlayBlur={2} />
      <QuizNavbar />
      <div className="p-4 flex flex-col">
        <Link passHref href="/">
          <a className="text-gray-300 underline font-noto justify-self-start">
            กลับ
          </a>
        </Link>
      </div>
      <div>hello world</div>
    </section>
  );
};

export default Quiz;
