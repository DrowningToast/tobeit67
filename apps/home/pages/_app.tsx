import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ApolloProvider } from '@apollo/client';
import { client } from '../gql/gql-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
        <Component {...pageProps} />
      </MantineProvider>
    </ApolloProvider>
  );
}

export default MyApp;
