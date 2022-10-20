import { LoadingOverlay, Skeleton } from "@mantine/core";
import { MainBase } from "airtable-api";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { firebaseReady, firebaseUserAtom } from "../../components/firebase";
import QuizNavbar from "../../components/quiz/QuizNavbar";
import Link from "next/link";
import { getRegisClient } from "../../gql/gql-client";
import { fetchUser, fetchUserResponse, insertUser } from "../../gql/query";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FieldSet } from "airtable/lib/field_set";
import fetchAirtableCamperByEmail from "../../components/airtable/airtableQuery";

interface AirtableOnlineCamperRecord {
  Email: string;
  ชื่อ: string;
  นามสกุล: string;
  มัธยมศึกษาชั้นปีที่:
    | "ม.4"
    | "ม.5"
    | "ม.6"
    | "ปวช. ปี1"
    | "ปวช. ปี2"
    | "ปวช. ปี3"
    | "อื่นๆ";
  จังหวัด: string;
  เบอร์โทรศัพท์ที่สามารถติดต่อได้: string;
}

const gradeMapping = {
  "ม.4": "M4",
  "ม.5": "M5",
  "ม.6": "M6",
  "ปวช. ปี1": "P1",
  "ปวช. ปี2": "P2",
  "ปวช. ปี3": "P3",
  อื่นๆ: "OTHER",
};

const Quiz: NextPage = () => {
  // When validation is check

  const [user] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  const [validData, setValidData] = useState(true);
  const [airtableData, setAirtableData] =
    useState<AirtableOnlineCamperRecord | null>(null);

  const { data, loading: fecthingUser } = useQuery<fetchUserResponse>(
    fetchUser(user?.email!),
    {
      skip: !user || !ready || !validData,
    }
  );

  const [
    createNewUser,
    { data: newUserResponse, loading: creatingNewUser, error },
  ] = useMutation(insertUser, {});

  const router = useRouter();

  const isLoading = useMemo(() => {
    return !Boolean(user && validData && airtableData && data?.user);
  }, [user, validData, airtableData, data?.user]);

  useEffect(() => {
    if (!user && !ready) return;

    const fecthAirtable = async () => {
      const records = await fetchAirtableCamperByEmail(user?.email!);

      setValidData(
        records.find((record) => record.fields.Email === user?.email)
          ? true
          : false
      );

      setAirtableData(records[0].fields);
    };

    fecthAirtable();
  }, [user]);

  // Deal with unknown user
  useEffect(() => {
    if (!validData && ready && user) {
      alert("ไม่พบชื่อในระบบ กรุณาลงทะเบียนรอบออนไลน์ก่อน");
      router.push("/signout");
    } else if (!validData && ready && !user) {
      router.push("/signout");
    }
  }, [validData, ready]);

  // Check if brand new user
  useEffect(() => {
    if (
      !(
        validData &&
        !fecthingUser &&
        !data?.user &&
        user?.token &&
        user?.email &&
        airtableData
      )
    )
      return;

    const genNewUser = async () => {
      if (!airtableData["มัธยมศึกษาชั้นปีที่"])
        throw new Error("Missing grade property from Airtable");

      await createNewUser({
        variables: {
          email: user.email,
          firstname: airtableData["ชื่อ"],
          lastname: airtableData["นามสกุล"],
          grade: gradeMapping[airtableData["มัธยมศึกษาชั้นปีที่"]],
          province: airtableData["จังหวัด"],
          phoneNum: airtableData["เบอร์โทรศัพท์ที่สามารถติดต่อได้"],
        },
      });
    };

    genNewUser();
  }, [fecthingUser, data, validData]);

  return (
    <section className="relative min-h-screen bg-water-blue">
      <LoadingOverlay
        visible={!validData || !ready || !user || !data}
        overlayBlur={3}
      />
      <QuizNavbar />
      <div className="p-4 flex flex-col">
        <Link passHref href="/">
          <a className="text-gray-300 underline font-noto justify-self-start xl:text-xl">
            กลับ
          </a>
        </Link>
      </div>
      <div className="px-20 md:px-42 py-4 md:py-24">
        <div className="w-full flex flex-col gap-y-4 md:gap-y-12">
          <div className="flex gap-y-2 flex-col">
            <Skeleton visible={isLoading}>
              <h1 className="text-xl md:text-4xl font-bold font-noto inline-block w-full text-center">
                น้องยังเหลือโอกาสในการทำ quiz อีก{" "}
                <span className="text-glossy-coral">
                  {data?.user.remainingAttempt}
                </span>{" "}
                ครั้ง
              </h1>
            </Skeleton>

            <Skeleton animate visible={isLoading}>
              <h1 className="text-xl md:text-4xl font-bold font-noto inline-block w-full text-center">
                ประกาศนียบัตร จะเป็นของชื่อ{" "}
                <span className="text-blue-300">
                  {data?.user.firstname} {data?.user.lastname}
                </span>
              </h1>
            </Skeleton>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center md:gap-y-12 gap-y-6">
        <Skeleton visible={isLoading} className="flex justify-center w-auto">
          <Link href="/quiz/start" passHref>
            <a>
              <button className="bg-glossy-coral px-32 py-6 rounded-full text-3xl font-noto font-bold">
                เริ่มทำ
              </button>
            </a>
          </Link>
        </Skeleton>
        <Link href="/quiz/end" passHref>
          <a
            target="_blank"
            className="text-base md:text-2xl font-bold font-noto inline-block w-full text-center underline"
          >
            ดูคะแนนสอบครั้งที่แล้ว
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Quiz;
