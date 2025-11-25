import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  query customer {
    customer {
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

export const UPDATE_PERSONAL_INFO = gql`
  mutation updateCustomerV2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
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
  }
`;

export const UPDATE_CUSTOMER_EMAIL = gql`
  mutation updateCustomerEmail($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
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
  }
`;

export const CHANGE_CUSTOMER_PASSWORD = gql`
  mutation changeCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      firstname
      lastname
    }
  }
`;
