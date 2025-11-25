import { useQuery } from '@apollo/client/react';
import { CUSTOMER } from '../api/customerApi';
import type { Customer, CustomerQuery } from './types';

interface UseCustomerResult {
  customer?: Customer;
  loading: boolean;
  error?: Error;
}

export const useCustomer = (): UseCustomerResult => {
  const { data, loading, error } = useQuery<CustomerQuery>(CUSTOMER, {
    fetchPolicy: 'network-only',
  });

  return {
    customer: data?.customer,
    loading,
    error,
  };
};
