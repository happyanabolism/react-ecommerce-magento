import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  query customer {
    customer {
      id
      email
      firstname
      lastname
      gender
    }
  }
`;
