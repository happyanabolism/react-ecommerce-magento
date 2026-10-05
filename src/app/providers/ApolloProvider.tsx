import type { ReactNode } from 'react';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as AProvider } from '@apollo/client/react';
import { SetContextLink } from '@apollo/client/link/context';
import { ErrorLink } from '@apollo/client/link/error';
import { store } from '@app/store';
import { logout, selectJwt } from '@entities/session';
import { API_ERRORS } from '@shared/constants';
import { getMagentoErrors } from '@shared/utils';
import introspection from '@shared/api/gql/possibleTypes';
import { addNotification } from '@entities/notification';

const API_URI = '/graphql';
const httpLink = new HttpLink({ uri: API_URI });

const authLink = new SetContextLink(({ headers }) => {
  const token = selectJwt(store.getState());
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

const errorLink = new ErrorLink(({ error, operation, forward }) => {
  const magentoErrors = getMagentoErrors(error);
  const token = selectJwt(store.getState());

  // Invalid or expired token. Magento uses the same `graphql-authentication`
  // category for a wrong password, the difference is `path`:
  // - token is checked before any resolver runs, so the whole request is
  //   rejected and the error has no `path`;
  // - a wrong password comes from a resolver (e.g. path: ['generateCustomerToken']),
  //   it must be shown in the form, not log the customer out.
  const isAuthenticationError = magentoErrors.some(
    (err) => err.extensions?.category === API_ERRORS.AUTHENTICATION && !err.path
  );
  const isAuthorizationError = magentoErrors.some(
    (err) => err.extensions?.category === API_ERRORS.AUTHORIZATION
  );

  // retry as a guest; the token check guarantees a single retry
  if (isAuthenticationError && token) {
    store.dispatch(logout());
    store.dispatch(
      addNotification({
        type: 'error',
        message: 'Your session has expired, please log in again	',
      })
    );
    // the operation still has the expired Authorization header set by authLink
    // on the first attempt, remove it so the retry goes without a token
    operation.setContext(({ headers }) => {
      const { Authorization: _expiredToken, ...restHeaders } = headers ?? {};
      return { headers: restHeaders };
    });
    return forward(operation);
  }
  if (isAuthorizationError) {
    store.dispatch(logout());
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    possibleTypes: introspection.possibleTypes,
    typePolicies: {
      ConfigurableProduct: { keyFields: ['uid'] },
      SimpleProduct: { keyFields: ['uid'] },
      CategoryTree: { keyFields: ['uid'] },
      StoreConfig: { keyFields: ['store_code'] },
      Customer: { keyFields: () => 'customer' },
    },
  }),
});

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return <AProvider client={client}>{children}</AProvider>;
};
