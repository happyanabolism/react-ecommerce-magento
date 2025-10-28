import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '../api/categoryApi';
import { DEFAULT_PAGE_NUM, DEFAULT_PAGE_SIZE } from '@shared/constants';

export const useCategory = ({
  filter,
  pageSize = DEFAULT_PAGE_SIZE,
  currentPage = DEFAULT_PAGE_NUM,
}) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: {
      filters: filter,
      pageSize: pageSize,
      currentPage: currentPage,
    },
  });

  return { category: data?.categories?.items?.[0] || {}, loading, error };
};
