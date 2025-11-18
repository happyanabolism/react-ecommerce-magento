import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  query customer {
    customer {
      id
      email
      firstname
      lastname
      gender
      custom_attributes {
        code
        ... on AttributeValue {
          value
        }
        ... on AttributeSelectedOptions {
          selected_options {
            label
            value
          }
        }
      }
    }
  }
`;
