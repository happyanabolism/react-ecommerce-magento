import { useQuery } from '@apollo/client/react';
import { STORE_CONFIG } from '../api/storeApi';

export const useStoreConfig = () => {
  const { data, loading, error } = useQuery(STORE_CONFIG);

  return { storeConfig: data?.storeConfig, loading, error };
};
