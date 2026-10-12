import { useQuery } from '@tanstack/react-query';
import { CATEGORY_MENU } from '../api/categoryApi';
import { request } from '@shared/api';

export const useCategoryMenu = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['categoryMenu'],
    queryFn: () => request(CATEGORY_MENU),
  });

  const children = data?.categories?.items?.[0]?.children ?? [];

  return {
    categories: children.filter((item) => item !== null),
    ...rest,
  };
};
