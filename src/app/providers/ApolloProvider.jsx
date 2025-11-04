import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as AProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from "@apollo/client/link/error";
import { store } from '@app/store';
import { selectJwt } from '@entities/customer';
import { API_ERRORS } from '@shared/constants';

const API_URI = 'http://localhost/graphql';
const httpLink = new HttpLink({ uri: API_URI });

const authLink =  new SetContextLink(({ headers }) => {
  const token = selectJwt(store.getState());
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
});

const errorLink = new ErrorLink(({ result }) => {
  for (const error of result.errors) {
    // handle error from api for non-authorized users
    if (error.extensions.category === API_ERRORS.AUTHORIZATION) {
      console.log(error.message);
    }
  }
})

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }) => {
  return (
    <AProvider client={client}>
      { children }
    </AProvider>
  );
}
