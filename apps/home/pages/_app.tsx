import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MantineProvider, Modal } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";
import { client } from "../gql/gql-client";

import { useAtom } from "jotai";
import {
  AuthUpdater,
  firebaseReady,
  firebaseUserAtom,
} from "../components/firebase";

function MyApp({ Component, pageProps }: AppProps) {
  const [ready] = useAtom(firebaseReady);
  const [user] = useAtom(firebaseUserAtom);

  return (
    <>
      <ApolloProvider client={client}>
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
          <AuthUpdater />
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
