import { useQuery } from '@apollo/client/react';
import { STORE_CONFIG } from '../api/storeApi';
import type { StoreConfigQuery } from './types';

export const useStoreConfig = () => {
  const { data, loading, error } = useQuery<StoreConfigQuery>(STORE_CONFIG);

  return { storeConfig: data?.storeConfig, loading, error };
};
