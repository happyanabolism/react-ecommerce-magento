import { useQuery } from '@apollo/client/react';
import { ROUTE } from '../api/routeApi';
import type { RouteQuery, RouteQueryVars } from './types';

export const useUrlResolve = (url: string) => {
  const { data, loading, error } = useQuery<RouteQuery, RouteQueryVars>(ROUTE, {
    variables: {
      url: url,
    },
  });

  return { route: data?.route, loading, error };
};
