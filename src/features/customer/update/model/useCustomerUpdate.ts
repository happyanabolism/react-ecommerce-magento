import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { CUSTOMER, UPDATE_PERSONAL_INFO } from '@entities/customer';
import type {
  CustomerUpdateInput,
  CustomerUpdateQuery,
  CustomerUpdateQueryVars,
} from './types';

type UseCustomerUpdateResult = [
  updateCustomer: (updateCustomerData: CustomerUpdateInput) => void,
  result: ReturnType<
    typeof useMutation<CustomerUpdateQuery, CustomerUpdateQueryVars>
  >[1],
];

export const useCustomerUpdate = (): UseCustomerUpdateResult => {
  const [mutate, result] = useMutation<
    CustomerUpdateQuery,
    CustomerUpdateQueryVars
  >(UPDATE_PERSONAL_INFO, {
    update(cache, { data }) {
      if (data) {
        cache.writeQuery({
          query: CUSTOMER,
          data: { customer: data.updateCustomerV2.customer },
        });
      }
    },
  });

  const updateCustomer = useCallback(
    (updateCustomerData: CustomerUpdateInput) => {
      mutate({ variables: { input: updateCustomerData } });
    },
    [mutate]
  );

  return [updateCustomer, result];
};
