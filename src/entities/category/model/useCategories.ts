import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import type { Categories, CategoryQuery, CategoryQueryVars } from './types';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';

type UseCategoriesResult = Categories &
  Omit<ReturnType<typeof useQuery<CategoryQuery, CategoryQueryVars>>, 'data'>;

export const useCategories = ({
  filters,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE_NUM,
  skip = false,
}: CategoryQueryVars & { skip?: boolean }): UseCategoriesResult => {
  const { data, ...rest } = useQuery<CategoryQuery, CategoryQueryVars>(
    CATEGORIES,
    {
      variables: {
        filters,
        pageSize,
        currentPage,
      },
      skip,
    }
  );

  return {
    items: data?.categories.items || [],
    page_info: data?.categories.page_info || {},
    ...rest,
  };
};
