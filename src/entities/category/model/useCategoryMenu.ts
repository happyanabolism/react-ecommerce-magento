import { useQuery } from '@apollo/client/react';
import { CATEGORY_MENU } from '../api/categoryApi';

export const useCategoryMenu = () => {
  const { data, ...rest } = useQuery(CATEGORY_MENU);

  const children = data?.categories?.items?.[0]?.children ?? [];

  return {
    categories: children.filter((item) => item !== null),
    ...rest,
  };
};
