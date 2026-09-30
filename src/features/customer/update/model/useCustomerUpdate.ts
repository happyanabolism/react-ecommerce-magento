import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { UPDATE_PERSONAL_INFO } from '@entities/customer';
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
  >(UPDATE_PERSONAL_INFO);

  const updateCustomer = useCallback(
    (updateCustomerData: CustomerUpdateInput) => {
      mutate({ variables: { input: updateCustomerData } });
    },
    [mutate]
  );

  return [updateCustomer, result];
};
