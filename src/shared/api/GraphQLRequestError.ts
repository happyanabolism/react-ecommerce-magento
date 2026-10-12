import type { GraphQLFormattedError } from 'graphql';

// GraphQL errors returned by Magento; `message` is all messages joined
export class GraphQLRequestError extends Error {
  errors: readonly GraphQLFormattedError[];

  constructor(errors: readonly GraphQLFormattedError[]) {
    super(errors.map(({ message }) => message).join(', '));
    this.name = 'GraphQLRequestError';
    this.errors = errors;
  }
}
