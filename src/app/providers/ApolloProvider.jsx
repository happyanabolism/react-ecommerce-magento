import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as AProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { store } from '@app/store';
import { selectAuthToken } from '@entities/auth';

const API_URI = 'http://localhost/graphql';
const httpLink = new HttpLink({ uri: API_URI });

const authLink =  new SetContextLink(({ headers }) => {
  const token = selectAuthToken(store.getState());
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }) => {
  return (
    <AProvider client={client}>
      { children }
    </AProvider>
  );
}
