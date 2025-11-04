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

const CUSTOMER_STATE_QUERY = gql`
  query customer {
    customer {
      email
      firstname
      lastname
    }
  }
`;

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
