import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ApolloProvider } from "@apollo/client";
import { client } from "../gql/gql-client";
import { AuthUpdater } from "firebase-auth-api";
import validateRegistration from "../components/auth/validateRegistration";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthUpdater callback={validateRegistration} />
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
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </MantineProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
