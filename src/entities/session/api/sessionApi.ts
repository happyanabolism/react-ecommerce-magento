import { graphql } from '@shared/api';

export const GENERATE_CUSTOMER_TOKEN = graphql(`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);
