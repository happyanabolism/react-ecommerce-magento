import { useQuery } from '@tanstack/react-query';
import { CUSTOMER } from '../api/customerApi';
import { useAppSelector } from '@shared/lib';
import { selectJwt } from '@entities/session/@x/customer';
import { request } from '@shared/api';

export const useCustomer = () => {
  const jwt = useAppSelector(selectJwt);
  const { data, ...rest } = useQuery({
    queryKey: ['customer'],
    queryFn: () => request(CUSTOMER),
    enabled: !!jwt,
    staleTime: 0,
  });

  return {
    customer: data?.customer,
    ...rest,
  };
};
