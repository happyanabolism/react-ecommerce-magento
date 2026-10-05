import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { UPDATE_PERSONAL_INFO } from '../api/customerUpdateApi';
import type { CustomerUpdateInput } from '@shared/api/gql/graphql';

export const useCustomerUpdate = () => {
  const [mutate, result] = useMutation(UPDATE_PERSONAL_INFO);

  const updateCustomer = useCallback(
    (updateCustomerData: CustomerUpdateInput) => {
      mutate({ variables: { input: updateCustomerData } });
    },
    [mutate]
  );

  return [updateCustomer, result] as const;
};
