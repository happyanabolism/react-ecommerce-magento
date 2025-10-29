import { useQuery } from '@apollo/client/react';
import { ROUTE } from '../api/routApi';

export const useUrlResolve = (url) => {
  const { data, loading, error } = useQuery(ROUTE, {
    variables: {
      url: url,
    },
  });

  return { route: data?.route || {}, loading, error };
};
