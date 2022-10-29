import React from "react";
// import { QrReader as Reader } from "react-qr-reader";

type Props = {
  onResult: (text: string) => void;
};

const QrReader: React.FC<Props> = ({ onResult }) => {
  return (
    <div className="w-64 h-64 aspect-square">
      {/* <Reader
        onResult={(result, error) => {
          if (!!result) {
            onResult(result.getText());
          }

          if (!!error) {
            console.info(error);
          }
        }}
        videoContainerStyle={{ width: "100%" }}
        constraints={{ width: 512, height: 512 }}
      /> */}
    </div>
  );
};

export default QrReader;
