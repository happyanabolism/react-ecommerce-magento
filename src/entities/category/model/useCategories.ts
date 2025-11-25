import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import type { Category, CategoryQuery, CategoryQueryVars } from './types';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';

interface useCategoriesResult {
  categories: Category[];
  loading: boolean;
  error?: Error;
}

export const useCategories = ({
  filters,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE_NUM,
  skip = false,
}: CategoryQueryVars & { skip?: boolean }): useCategoriesResult => {
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

  return { categories: data?.categories.items || [], loading, error };
};
