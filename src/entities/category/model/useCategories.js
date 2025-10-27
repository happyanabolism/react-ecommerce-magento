import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '../api/categoryApi';

export const useCategories = (filter, pageSize = 20, currentPage = 1) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: {
      filters: filter,
      pageSize: pageSize,
      currentPage: currentPage,
    },
  });

  return { categories: data?.categories?.items || [], loading, error };
};
