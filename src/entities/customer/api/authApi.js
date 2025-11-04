import { gql } from '@apollo/client';

const GENERATE_CUSTOMER_TOKEN = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const generateAuthToken = async (client, email, password) => {
  const { data } = await client.mutate({
    mutation: GENERATE_CUSTOMER_TOKEN,
    variables: {
      email: email,
      password: password,
    },
  });

  return data?.generateCustomerToken?.token;
};
