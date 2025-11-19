import { useQuery } from '@apollo/client/react';
import { CUSTOMER } from '../api/customerApi';
import { normalizeCustomer } from './normalizeCustomer';

export const useCustomer = () => {
  const { data, loading, error } = useQuery(CUSTOMER, {
    fetchPolicy: 'network-only',
  });

  return {
    customer: data?.customer ? normalizeCustomer(data?.customer) : null,
    loading,
    error,
  };
};
