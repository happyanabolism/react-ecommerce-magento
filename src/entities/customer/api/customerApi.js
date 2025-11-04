import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  query customer {
    customer {
      email
      firstname
      lastname
    }
  }
`;
