import { useQuery } from '@apollo/client/react';
import { URL_RESOLVE } from '../api/categoryApi';

export const useUrlResolve = ({ url }) => {
  const { data, loading, error } = useQuery(URL_RESOLVE, {
    variables: {
      url: url,
    },
  });

  return { data, loading, error };
};
