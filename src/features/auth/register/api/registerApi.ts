import { graphql } from '@shared/api/gql';

export const CREATE_CUSTOMER = graphql(`
  mutation createCustomerV2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        email
        firstname
        lastname
      }
    }
  }
`);
