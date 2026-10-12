import { print } from 'graphql';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GraphQLRequestError } from './GraphQLRequestError';
import { API_ERRORS } from './magento/errors';

const API_URL = '/graphql';

interface RequestConfig {
  getToken: () => string | null;
  onSessionExpired: () => void;
}

// set once by the app layer (configureRequest), shared can't import the store
let config: RequestConfig = {
  getToken: () => null,
  onSessionExpired: () => {},
};

export const configureRequest = (newConfig: RequestConfig) => {
  config = newConfig;
};

const send = async (
  query: string,
  variables: unknown,
  token: string | null
) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  const { data, errors } = await response.json();
  if (errors?.length) throw new GraphQLRequestError(errors);

  return data;
};

// Magento checks the token before any resolver runs, so an invalid/expired
// token gives `graphql-authentication` without `path`; a wrong password
// comes from a resolver and has a `path`
const isSessionExpired = (error: unknown) =>
  error instanceof GraphQLRequestError &&
  error.errors.some(
    (err) => err.extensions?.category === API_ERRORS.AUTHENTICATION && !err.path
  );

export const request = async <TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> => {
  const query = print(document);
  const token = config.getToken();

  try {
    return await send(query, variables, token);
  } catch (error) {
    // retry once as a guest; without a token there is nothing to expire
    if (token && isSessionExpired(error)) {
      config.onSessionExpired();
      return send(query, variables, null);
    }
    throw error;
  }
};
