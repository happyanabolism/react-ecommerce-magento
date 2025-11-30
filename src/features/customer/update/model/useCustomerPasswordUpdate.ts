import { useCallback } from 'react';
import { useMutation } from '@apollo/client/react';
import { CHANGE_CUSTOMER_PASSWORD } from '@entities/customer';
import type {
  CustomerUpdatePasswordInput,
  CustomerUpdatePasswordQuery,
} from './types';

type UseCustomerPasswordUpdateResult = [
  updateCustomerPassword: (
    updateCustomerPasswordData: CustomerUpdatePasswordInput
  ) => void,
  result: ReturnType<
    typeof useMutation<CustomerUpdatePasswordQuery, CustomerUpdatePasswordInput>
  >[1],
];

export const useCustomerPasswordUpdate =
  (): UseCustomerPasswordUpdateResult => {
    const [mutate, result] = useMutation<
      CustomerUpdatePasswordQuery,
      CustomerUpdatePasswordInput
    >(CHANGE_CUSTOMER_PASSWORD);

    const updateCustomerPassword = useCallback(
      (updateCustomerPasswordData: CustomerUpdatePasswordInput) => {
        mutate({
          variables: {
            currentPassword: updateCustomerPasswordData.currentPassword,
            newPassword: updateCustomerPasswordData.newPassword,
          },
        });
      },
      [mutate]
    );
    return [updateCustomerPassword, result];
  };
