import { useQuery } from '@apollo/client/react';
import { CUSTOMER } from '../api/customerApi';

export const useCustomer = () => {
  const { data, loading, error } = useQuery(CUSTOMER);

  return { customer: data?.customer, loading, error };
};
