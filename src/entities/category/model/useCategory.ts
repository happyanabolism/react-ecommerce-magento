import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';
import type { Category, CategoryQuery, CategoryQueryVars } from './types';

export const useCategory = ({
  filters,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE_NUM,
}: CategoryQueryVars): {
  category: Category | null;
  loading: boolean;
  error?: Error;
} => {
  const { data, loading, error } = useQuery<CategoryQuery, CategoryQueryVars>(
    CATEGORIES,
    {
      variables: {
        filters,
        pageSize,
        currentPage,
      },
    }
  );

  return { category: data?.categories.items[0] || null, loading, error };
};
