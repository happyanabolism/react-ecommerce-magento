import { gql } from '@apollo/client'

export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation generateCustomerToken(
    $email: String!,
    $password: String!
  ) {
    generateCustomerToken(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`