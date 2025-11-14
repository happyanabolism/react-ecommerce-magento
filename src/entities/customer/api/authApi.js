import { gql } from '@apollo/client';
import { normalizeCustomAttributes } from '@shared/lib';

const GENERATE_CUSTOMER_TOKEN = gql`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

const CREATE_CUSTOMER = gql`
  mutation createCustomerV2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        email
        firstname
        lastname
      }
    }
  }
`;

const CUSTOMER_STATE_QUERY = gql`
  query customer {
    customer {
      email
      firstname
      lastname
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

export const fetchCustomer = async (client, token) => {
  const { data } = await client.query({
    query: CUSTOMER_STATE_QUERY,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return data?.customer;
};

export const createCustomer = async (client, registrationData) => {
  const { data } = await client.mutate({
    mutation: CREATE_CUSTOMER,
    fetchPolicy: 'no-cache',
    variables: {
      input: normalizeCustomAttributes(registrationData),
    },
  });

  return data?.createCustomerV2?.customer;
};
