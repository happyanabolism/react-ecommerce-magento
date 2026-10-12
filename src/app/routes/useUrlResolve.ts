import { useQuery } from '@tanstack/react-query';
import { ROUTE } from './routeApi';
import { request } from '@shared/api';

export const useUrlResolve = (url: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ['route', url],
    queryFn: () => request(ROUTE, { url }),
  });

  return { route: data?.route, ...rest };
};
