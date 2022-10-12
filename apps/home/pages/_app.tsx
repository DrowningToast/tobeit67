import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{
        colors: {
          "2B": ["#2B2B2B"],
          "fresh-salmon": ["#FC6F68"],
          "glossy-coral": ["#FB8763"],
          "sea-serpent": ["#4BC7CF"],
          "water-blue": ["#007577"],
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
