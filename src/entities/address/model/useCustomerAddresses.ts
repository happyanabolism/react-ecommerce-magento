import { useQuery } from '@apollo/client/react';
import type { CustomerAddress } from './types';
import { CUSTOMER_ADDRESSES } from '../api/addressApi';
import { fromCustomerAddress } from '../lib/fromCustomerAddress';
import type {
  CustomerAddressesQuery,
  CustomerAddressesQueryVariables,
} from '@shared/api';

export const useCustomerAddresses = (): Omit<
  ReturnType<
    typeof useQuery<CustomerAddressesQuery, CustomerAddressesQueryVariables>
  >,
  'data'
> & { addresses: CustomerAddress[] } => {
  const { data, ...rest } = useQuery(CUSTOMER_ADDRESSES);

  return {
    addresses:
      data?.customer?.addresses
        ?.filter((address) => address !== null)
        .map(fromCustomerAddress) || [],
    ...rest,
  };
};
