// import { Blob } from "buffer";

function WebworkerLoader(worker: () => void) {
  const code = worker.toString();
  //@ts-ignore
  const blob = new Blob(["(" + code + ")()"]);
  //@ts-ignore
  return new Worker(URL.createObjectURL(blob));
}

export default WebworkerLoader;
