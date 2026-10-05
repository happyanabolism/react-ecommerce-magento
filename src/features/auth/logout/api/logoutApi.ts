import { graphql } from '@shared/api/gql';

export const REVOKE_CUSTOMER_TOKEN = graphql(`
  mutation revokeCustomerToken {
    revokeCustomerToken {
      result
    }
  }
`);
