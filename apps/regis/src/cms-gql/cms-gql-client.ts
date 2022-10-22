import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const endpoint = process.env.CMS_DEV;

const httpLink = createHttpLink({ uri: endpoint + '/graphql', fetch });

const authLink = setContext((_, { headers }) => {
  return {
    ...headers,
    headers: {
      Authorization: `Bearer ${process.env.BACKEND_CMS_TOKEN}`,
    },
  };
});

export const cmsClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});