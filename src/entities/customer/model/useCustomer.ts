import { useQuery } from '@apollo/client/react';
import { CUSTOMER } from '../api/customerApi';
import type { Customer, CustomerQuery } from './types';

interface UseCustomerResult
  extends Omit<ReturnType<typeof useQuery<CustomerQuery>>, 'data'> {
  customer?: Customer;
}

export const useCustomer = (): UseCustomerResult => {
  const { data, ...rest } = useQuery<CustomerQuery>(CUSTOMER, {
    fetchPolicy: 'network-only',
  });

  return {
    customer: data?.customer,
    ...rest,
  };
};
