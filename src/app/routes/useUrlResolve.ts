import { useQuery } from '@apollo/client/react';
import { ROUTE } from './routeApi';

export const useUrlResolve = (url: string) => {
  const { data, ...rest } = useQuery(ROUTE, {
    variables: {
      url,
    },
  });

  return { route: data?.route, ...rest };
};
