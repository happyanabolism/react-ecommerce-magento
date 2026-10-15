import { useQuery } from '@tanstack/react-query';
import { CATEGORY_MENU } from '../api/categoryApi';
import { request, type CategoryMenuQuery } from '@shared/api';

const selectCategories = (data: CategoryMenuQuery) =>
  (data.categories?.items?.[0]?.children ?? [])
    .filter((item) => item !== null)
    .filter((subcategory) => subcategory.include_in_menu)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

export const useCategoryMenu = () => {
  return useQuery({
    queryKey: ['categoryMenu'],
    queryFn: () => request(CATEGORY_MENU),
    select: selectCategories,
  });
};
