import { useQuery } from '@tanstack/react-query';
import { CUSTOMER_ADDRESSES } from '../api/addressApi';
import { fromCustomerAddress } from '../lib/fromCustomerAddress';
import { request, type CustomerAddressesQuery } from '@shared/api';

const selectAddresses = (data: CustomerAddressesQuery) =>
  data.customer?.addresses
    ?.filter((address) => address !== null)
    .map(fromCustomerAddress) || [];

export const useCustomerAddresses = () => {
  return useQuery({
    queryKey: ['customer', 'addresses'],
    queryFn: () => request(CUSTOMER_ADDRESSES),
    select: selectAddresses,
  });
};
