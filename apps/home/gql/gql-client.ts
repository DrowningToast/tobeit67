import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const CMSEndpoint =
  process.env.NODE_ENV.trim() == "development"
    ? process.env.NEXT_PUBLIC_CMS_DEV
    : process.env.NEXT_PUBLIC_CMS_PROD;

const regisEndpoint =
  process.env.NODE_ENV.trim() == "development"
    ? process.env.NEXT_PUBLIC_REGIS_DEV
    : process.env.NEXT_PUBLIC_REGIS_PROD;

export const client = new ApolloClient({
  uri: CMSEndpoint + "/graphql",
  cache: new InMemoryCache(),
});

const getFirebaseAuthLink = (token?: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

const regisHTTPLink = createHttpLink({
  uri: regisEndpoint + "/graphql",
});

export const getRegisClient = (token?: string) =>
  new ApolloClient({
    link: getFirebaseAuthLink(token).concat(regisHTTPLink),
    cache: new InMemoryCache(),
  });
