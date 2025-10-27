import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '../api/categoryApi';

export const useCategory = (
  filters,
  pageSize = 20,
  currentPage = 1,
  withProducts = true
) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: {
      filters: filters,
      pageSize: pageSize,
      currentPage: currentPage,
      withProducts: withProducts,
    },
  });

  return { category: data?.categories?.items?.[0] || {}, loading, error };
};
