import React from "react";
import QrReader from "../../components/QrReader";

const Attendance: React.FC = () => {
  const getText = (text: string) => {
    console.log(text);
  };

  return (
    <>
      <main className="min-h-screen w-full grid place-items-center">
        <QrReader onResult={getText} />
      </main>
    </>
  );
};

export default Attendance;
