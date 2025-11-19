import { useMutation } from '@apollo/client/react';
import { CHANGE_CUSTOMER_PASSWORD } from '@entities/customer';

export const useCustomerPasswordUpdate = () => {
  const [mutate, { data, loading, error }] = useMutation(
    CHANGE_CUSTOMER_PASSWORD
  );

  const updatePassword = (currentPassword, newPassword) => {
    mutate({ variables: { currentPassword, newPassword } });
  };

  return [updatePassword, { data, loading, error }];
};
