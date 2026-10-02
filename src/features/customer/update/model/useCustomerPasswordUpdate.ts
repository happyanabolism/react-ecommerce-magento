import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { CHANGE_CUSTOMER_PASSWORD } from '@entities/customer';
import type { ChangeCustomerPasswordMutationVariables } from '@shared/api/gql/graphql';

export const useCustomerPasswordUpdate = () => {
  const [mutate, result] = useMutation(CHANGE_CUSTOMER_PASSWORD);

  const updateCustomerPassword = useCallback(
    (variables: ChangeCustomerPasswordMutationVariables) => {
      mutate({
        variables,
      });
    },
    [mutate]
  );
  return [updateCustomerPassword, result] as const;
};
