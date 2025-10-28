import { useQuery } from '@apollo/client/react';
import { GET_CATEGORIES } from '../api/categoryApi';

export const useCategory = ({
  filter,
  pageSize = 20,
  currentPage = 1,
  includeProducts = true,
}) => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: {
      filters: filter,
      pageSize: pageSize,
      currentPage: currentPage,
      includeProducts: includeProducts,
    },
  });

  return { category: data?.categories?.items?.[0] || {}, loading, error };
};
