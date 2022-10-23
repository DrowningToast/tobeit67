import fetch from 'cross-fetch';
import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

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
  connectToDevTools: true,
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions,
});
