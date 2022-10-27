import React from 'react';
import QrReader from '../../components/QrReader';

const Attendance: React.FC = () => {
  const getText = (text: string) => {
    console.log(text);
  }

  return (
    <>
      <QrReader onResult={getText} />
    </>
  );
};

export default Attendance