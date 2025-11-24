import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import type { Category, CategoryQuery, CategoryQueryVars } from './types';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';

export const useCategories = ({
  filters,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE_NUM,
  skip = false,
}: CategoryQueryVars & { skip?: boolean }): {
  categories: Category[] | null;
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
      skip: skip,
    }
  );

  return { categories: data?.categories?.items || null, loading, error };
};
