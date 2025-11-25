import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { CUSTOMER, UPDATE_PERSONAL_INFO } from '@entities/customer';

export const useCustomerUpdate = () => {
  const [mutate, { data, loading, error }] = useMutation(UPDATE_PERSONAL_INFO, {
    update(cache, { data }) {
      cache.writeQuery({
        query: CUSTOMER,
        data: { customer: data.updateCustomerV2.customer },
      });
    },
  });

  const updateCustomer = useCallback(
    (customer) => {
      mutate({ variables: { input: customer } });
    },
    [mutate]
  );

  return [updateCustomer, { data, loading, error }];
};
