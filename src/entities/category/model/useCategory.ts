import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';
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
