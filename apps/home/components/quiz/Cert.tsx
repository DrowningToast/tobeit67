import { FC, memo, MutableRefObject } from "react";

interface Props {
  canvasRef: MutableRefObject<null>;
  firstname?: string;
  lastname?: string;
}

const Cert: FC<Props> = ({ canvasRef, firstname, lastname }) => {
  return (
    <div
      id="certificate"
      ref={canvasRef}
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="https://i2.paste.pics/d9f3c0afb281a8305fa97d5aaeb78a57.png"
        width="2527"
        height="1785"
      />
      <h1
        style={{
          color: "black",
          position: "absolute",
          fontFamily: '"Noto Sans Thai"',
          top: "90%",
          fontSize: 50,
          zIndex: "200",
        }}
      >
        <svg height="30" width="200">
          <text x="0" y="15" fill="red">
            {firstname}
          </text>
        </svg>
      </h1>
    </div>
  );
};

export default memo(Cert);
