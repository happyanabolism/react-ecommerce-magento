import { useQuery } from '@tanstack/react-query';
import { CUSTOMER } from '../api/customerApi';
import { useAppSelector } from '@shared/lib';
import { selectJwt } from '@entities/session/@x/customer';
import { request, type CustomerQuery } from '@shared/api';

const selectCustomer = (data: CustomerQuery) => data.customer;

export const useCustomer = () => {
  const jwt = useAppSelector(selectJwt);

  return useQuery({
    queryKey: ['customer'],
    queryFn: () => request(CUSTOMER),
    select: selectCustomer,
    enabled: !!jwt,
    staleTime: 0,
  });
};
