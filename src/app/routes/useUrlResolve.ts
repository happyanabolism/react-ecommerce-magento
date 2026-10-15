import { useQuery } from '@tanstack/react-query';
import { ROUTE } from './routeApi';
import { request, type RouteQuery } from '@shared/api';

const selectRoute = (data: RouteQuery) => data.route;

export const useUrlResolve = (url: string) => {
  return useQuery({
    queryKey: ['route', url],
    queryFn: () => request(ROUTE, { url }),
    select: selectRoute,
  });
};
