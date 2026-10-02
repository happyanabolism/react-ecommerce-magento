import { useQuery } from '@apollo/client/react';
import { CUSTOMER } from '../api/customerApi';
import { useAppSelector } from '@shared/lib';
import { selectJwt } from './selectors';

export const useCustomer = () => {
  const jwt = useAppSelector(selectJwt);
  const { data, ...rest } = useQuery(CUSTOMER, {
    fetchPolicy: 'cache-and-network',
    skip: !jwt,
  });

  return {
    customer: data?.customer,
    ...rest,
  };
};
