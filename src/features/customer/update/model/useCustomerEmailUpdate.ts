import { useMutation } from '@apollo/client/react';
import { CUSTOMER, UPDATE_CUSTOMER_EMAIL } from '@entities/customer';
import { useCallback } from 'react';
import type {
  CustomerUpdateEmailInput,
  CustomerUpdateEmailQuery,
} from './types';

type UseCustomerEmailUpdateResult = [
  updateCustomerEmail: (
    updateCustomerEmailData: CustomerUpdateEmailInput
  ) => void,
  result: ReturnType<
    typeof useMutation<CustomerUpdateEmailQuery, CustomerUpdateEmailInput>
  >[1],
];

export const useCustomerEmailUpdate = (): UseCustomerEmailUpdateResult => {
  const [mutate, result] = useMutation<
    CustomerUpdateEmailQuery,
    CustomerUpdateEmailInput
  >(UPDATE_CUSTOMER_EMAIL, {
    update(cache, { data }) {
      if (data) {
        cache.writeQuery({
          query: CUSTOMER,
          data: { customer: data.updateCustomerEmail.customer },
        });
      }
    },
  });

  const updateCustomerEmail = useCallback(
    (updateCustomerEmailData: CustomerUpdateEmailInput) => {
      mutate({
        variables: {
          email: updateCustomerEmailData.email,
          password: updateCustomerEmailData.password,
        },
      });
    },
    [mutate]
  );

  return [updateCustomerEmail, result];
};
