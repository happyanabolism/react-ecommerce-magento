import { useQuery } from '@apollo/client/react';
import { ROUTE } from './routeApi';
import type { RouteQuery, RouteQueryVariables } from '@shared/api/gql/graphql';

interface UseUrlResolveResult extends Omit<
  ReturnType<typeof useQuery<RouteQuery, RouteQueryVariables>>,
  'data'
> {
  route?: RouteQuery['route'];
}

export const useUrlResolve = (url: string): UseUrlResolveResult => {
  const { data, ...rest } = useQuery(ROUTE, {
    variables: {
      url,
    },
  });

  return { route: data?.route, ...rest };
};
