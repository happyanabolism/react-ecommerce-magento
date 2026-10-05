import { graphql } from '@shared/api/gql';

export const UPDATE_PERSONAL_INFO = graphql(`
  mutation updateCustomerV2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        ...CustomerFields
      }
    }
  }
`);

export const UPDATE_CUSTOMER_EMAIL = graphql(`
  mutation updateCustomerEmail($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        ...CustomerFields
      }
    }
  }
`);

export const CHANGE_CUSTOMER_PASSWORD = graphql(`
  mutation changeCustomerPassword(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      ...CustomerFields
    }
  }
`);
