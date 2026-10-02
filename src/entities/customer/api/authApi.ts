import { type ApolloClient } from '@apollo/client';
import type {
  CustomerCreateInput,
  GenerateCustomerTokenMutationVariables,
} from '@shared/api/gql/graphql';
import { graphql } from '@shared/api/gql';

const GENERATE_CUSTOMER_TOKEN = graphql(`
  mutation generateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`);

const CREATE_CUSTOMER = graphql(`
  mutation createCustomerV2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        email
        firstname
        lastname
      }
    }
  }
`);

export const generateAuthToken = async (
  client: ApolloClient,
  authData: GenerateCustomerTokenMutationVariables
) => {
  const { data } = await client.mutate({
    mutation: GENERATE_CUSTOMER_TOKEN,
    variables: authData,
  });

  return data?.generateCustomerToken?.token ?? null;
};

export const createCustomer = async (
  client: ApolloClient,
  registrationData: CustomerCreateInput
) => {
  const { data } = await client.mutate({
    mutation: CREATE_CUSTOMER,
    fetchPolicy: 'no-cache',
    variables: {
      input: registrationData,
    },
  });

  return data?.createCustomerV2?.customer ?? null;
};
