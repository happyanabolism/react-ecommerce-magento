import { graphql } from '@shared/api';

export const REVOKE_CUSTOMER_TOKEN = graphql(`
  mutation revokeCustomerToken {
    revokeCustomerToken {
      result
    }
  }
`);
