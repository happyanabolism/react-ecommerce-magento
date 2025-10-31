import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as AProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { store } from '@app/store/store';
import { selectCustomerToken } from '@entities/customer';

const API_URI = 'http://localhost/graphql';
const httpLink = new HttpLink({ uri: API_URI });

export const ApolloProvider = ({ children }) => {

  const authLink =  new SetContextLink(({ headers }) => {
    const token = selectCustomerToken(store.getState());
    console.log(store.getState());
    console.log(token);
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

  return (
    <AProvider client={client}>
      { children }
    </AProvider>
  );
}
