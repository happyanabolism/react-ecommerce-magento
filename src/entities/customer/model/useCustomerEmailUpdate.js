import { useMutation } from '@apollo/client/react';
import { CUSTOMER, UPDATE_CUSTOMER_EMAIL } from '@entities/customer';
import { useCallback } from 'react';

export const useCustomerEmailUpdate = () => {
  const [mutate, { data, loading, error }] = useMutation(
    UPDATE_CUSTOMER_EMAIL,
    {
      update(cache, { data }) {
        cache.writeQuery({
          query: CUSTOMER,
          data: { customer: data.updateCustomerEmail.customer },
        });
      },
    }
  );

  const updateEmail = useCallback(
    (email, password) => {
      mutate({
        variables: {
          email,
          password,
        },
      });
    },
    [mutate]
  );

  return [updateEmail, { data, loading, error }];
};
