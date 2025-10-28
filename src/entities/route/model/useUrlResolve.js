import { useQuery } from '@apollo/client/react';
import { URL_RESOLVER } from '../api/routApi';

export const useUrlResolve = (url) => {
  const { data, loading, error } = useQuery(URL_RESOLVER, {
    variables: {
      url: url,
    },
  });

  return { route: data?.route || {}, loading, error };
};
