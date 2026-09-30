import type { GraphQLFormattedError } from 'graphql';
import type { ErrorLike } from '@apollo/client';
import { CombinedGraphQLErrors, ServerError } from '@apollo/client/errors';

/**
 * Returns GraphQL errors from a Magento response, regardless of the HTTP status.
 *
 * Magento responds to authentication/authorization errors with HTTP 401/403.
 * Apollo doesn't parse non-2xx responses, so their errors are available only
 * as raw JSON in `ServerError.bodyText`.
 */
export const getMagentoErrors = (
  error: ErrorLike
): readonly GraphQLFormattedError[] => {
  if (CombinedGraphQLErrors.is(error)) return error.errors;

  if (ServerError.is(error)) {
    try {
      return JSON.parse(error.bodyText).errors ?? [];
    } catch {
      // body is not JSON, e.g. an HTML error page from nginx
      return [];
    }
  }

  return [];
};

/**
 * Error text to show to the customer, the same way Venia (PWA Studio) does it:
 * all Magento messages joined, or the error's own message if there are none.
 */
export const getMagentoErrorMessage = (error: ErrorLike): string => {
  const magentoErrors = getMagentoErrors(error);
  if (magentoErrors.length === 0) return error.message;

  return magentoErrors.map(({ message }) => message).join(', ');
};
