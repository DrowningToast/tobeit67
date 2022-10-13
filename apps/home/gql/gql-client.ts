import { ApolloClient, InMemoryCache } from "@apollo/client";

const endpoint =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_CMS_DEV
    : process.env.NEXT_PUBLIC_CMS_PROD;

export const client = new ApolloClient({
  uri: endpoint + "/graphql",
  cache: new InMemoryCache(),
});
