import { useQuery } from '@tanstack/react-query';
import { CUSTOMER_ADDRESSES } from '../api/addressApi';
import { fromCustomerAddress } from '../lib/fromCustomerAddress';
import { request } from '@shared/api';

export const useCustomerAddresses = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['customer', 'addresses'],
    queryFn: () => request(CUSTOMER_ADDRESSES),
  });

  return {
    addresses:
      data?.customer?.addresses
        ?.filter((address) => address !== null)
        .map(fromCustomerAddress) || [],
    ...rest,
  };
};
