import { useMutation } from '@apollo/client/react';
import { UPDATE_CUSTOMER_EMAIL } from '../api/customerUpdateApi';
import { useCallback } from 'react';
import type { UpdateCustomerEmailMutationVariables } from '@shared/api/gql/graphql';

export const useCustomerEmailUpdate = () => {
  const [mutate, result] = useMutation(UPDATE_CUSTOMER_EMAIL);

  const updateCustomerEmail = useCallback(
    (variables: UpdateCustomerEmailMutationVariables) => {
      mutate({
        variables,
      });
    },
    [mutate]
  );

  return [updateCustomerEmail, result] as const;
};
