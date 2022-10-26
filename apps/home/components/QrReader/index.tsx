import React from 'react';
import { QrReader as Reader } from 'react-qr-reader';

type Props = {
  onResult: (text: string) => void
}

const QrReader: React.FC<Props> = ({ onResult }) => {
  return (
    <div className="w-48 h-48 aspect-square">
      <Reader
        onResult={(result, error) => {
          if (!!result) {
            onResult(result.getText())
          }

          if (!!error) {
            console.info(error);
          }
        }}
        videoContainerStyle={{ width: '100%' }}
        constraints={{ width: 192, height: 192 }}
      />
    </div>
  );
};

export default QrReader