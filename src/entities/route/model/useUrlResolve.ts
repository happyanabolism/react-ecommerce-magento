import { useQuery } from '@apollo/client/react';
import { ROUTE } from '../api/routeApi';
import type { Route, RouteQuery, RouteQueryVars } from './types';

interface UseUrlResolveResult
  extends Omit<
    ReturnType<typeof useQuery<RouteQuery, RouteQueryVars>>,
    'data'
  > {
  route?: Route;
}

export const useUrlResolve = (url: string): UseUrlResolveResult => {
  const { data, ...rest } = useQuery<RouteQuery, RouteQueryVars>(ROUTE, {
    variables: {
      url,
    },
  });

  return { route: data?.route, ...rest };
};
