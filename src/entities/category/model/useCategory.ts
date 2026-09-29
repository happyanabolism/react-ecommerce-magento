import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import type { Category, CategoryQuery, CategoryQueryVars } from './types';

interface UseCategoryResult
  extends Omit<
    ReturnType<typeof useQuery<CategoryQuery, CategoryQueryVars>>,
    'data'
  > {
  category: Category | null;
}

export const useCategory = ({
  filters,
  pageSize = 1,
  currentPage = 1,
}: CategoryQueryVars): UseCategoryResult => {
  const { data, ...rest } = useQuery<CategoryQuery, CategoryQueryVars>(
    CATEGORIES,
    {
      variables: {
        filters,
        pageSize,
        currentPage,
      },
    }
  );

  return { category: data?.categories.items[0] || null, ...rest };
};
