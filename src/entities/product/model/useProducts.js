import { useQuery } from '@apollo/client/react';
import { PRODUCTS } from '../api/productApi';

export const useProducts = ({
  filter = {},
  pageSize = 20,
  currentPage = 1,
}) => {
  const { data, loading, error } = useQuery(PRODUCTS, {
    variables: {
      filter: filter,
      pageSize: pageSize,
      currentPage: currentPage,
    },
    fetchPolicy: 'cache-and-network',
  });

  return {
    products: data?.products?.items || [],
    pageInfo: data?.products?.page_info || {},
    loading,
    error,
  };
};
