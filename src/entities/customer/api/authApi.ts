import { gql, type ApolloClient } from '@apollo/client';
import type {
  Customer,
  CustomerCreateQuery,
  AuthCusomerData,
  CustomerCreateVars,
  CustomerCreateInput,
} from '../model/types';

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

export const generateAuthToken = async (
  client: ApolloClient,
  email: string,
  password: string
): Promise<string | null> => {
  const { data } = await client.mutate<{
    generateCustomerToken: { token: string };
  }>({
    mutation: GENERATE_CUSTOMER_TOKEN,
    variables: {
      email,
      password,
    },
  });

  return data?.generateCustomerToken?.token ?? null;
};

export const fetchCustomer = async (
  client: ApolloClient,
  token: string
): Promise<AuthCusomerData | null> => {
  const { data } = await client.query<{ customer: AuthCusomerData }>({
    query: CUSTOMER_STATE_QUERY,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return data?.customer ?? null;
};

export const createCustomer = async (
  client: ApolloClient,
  registrationData: CustomerCreateInput
): Promise<Customer | null> => {
  const { data } = await client.mutate<CustomerCreateQuery, CustomerCreateVars>(
    {
      mutation: CREATE_CUSTOMER,
      fetchPolicy: 'no-cache',
      variables: {
        input: registrationData,
      },
    }
  );

  return data?.createCustomerV2?.customer ?? null;
};
