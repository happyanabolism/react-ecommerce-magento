import { useQuery } from '@apollo/client/react';
import { CUSTOMER } from '../api/customerApi';
import type { CustomerWithFlatAttributes, CustomerQuery } from './types';
import { flatCustomAttibutes } from '@shared/utils';

interface UseCustomerResult {
  customer?: CustomerWithFlatAttributes;
  loading: boolean;
  error?: Error;
}

export const useCustomer = (): UseCustomerResult => {
  const { data, loading, error } = useQuery<CustomerQuery>(CUSTOMER, {
    fetchPolicy: 'network-only',
  });

  return {
    customer: data?.customer ? flatCustomAttibutes(data?.customer) : undefined,
    loading,
    error,
  };
};
