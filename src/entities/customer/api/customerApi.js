import { gql } from '@apollo/client';

const CUSTOMER = gql`
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
    query: CUSTOMER,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  return data?.customer;
};
