import { LoadingOverlay } from "@mantine/core";
import { MainBase } from "airtable-api";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { firebaseReady, firebaseUserAtom } from "../../components/firebase";

const Quiz: NextPage = () => {
  // When validation is check
  const [isLoading, setLoading] = useState<boolean>(false);
  const [user] = useAtom(firebaseUserAtom);
  const [ready] = useAtom(firebaseReady);
  // Check if user exists in airtable
  const [validData, setValidData] = useState(true);

  // useMemo(async () => {
  //   if (!user && !ready) return true;
  //   if (!user && ready) return false;

  //   let result = false;

  //   const emails = await MainBase.table<{
  //     Email: string;
  //   }>("Camper-Register")
  //     .select({
  //       fields: ["Email"],
  //       filterByFormula: `Email = "${user?.email}"`,
  //     })
  //     .all();

  //   result = emails.find((record) => record.fields.Email === user?.email)
  //     ? true
  //     : false;

  //   return result;
  // }, [user, ready]);

  // Fetch to find out remaining attempt
  // TODO

  const router = useRouter();

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
    <section className="relative min-h-screen">
      <LoadingOverlay visible={!(ready && validData)} overlayBlur={2} />
      <div>hello world</div>
    </section>
  );
};

export default Quiz;
