import { useQuery } from '@apollo/client/react';
import { CATEGORIES } from '../api/categoryApi';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';

export const useCategories = ({
  filter,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE_NUM,
  skip = false,
}) => {
  const { data, loading, error } = useQuery(CATEGORIES, {
    variables: {
      filters: filter,
      pageSize: pageSize,
      currentPage: currentPage,
    },
    skip: skip,
  });

  return { categories: data?.categories?.items || [], loading, error };
};
