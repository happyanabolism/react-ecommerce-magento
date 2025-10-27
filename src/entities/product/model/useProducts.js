import { useQuery } from '@apollo/client/react';
import { GET_PRODUCTS } from '../api/productApi';

export const useProducts = ({
  filter = {},
  pageSize = 20,
  currentPage = 1,
}) => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: filter,
      pageSize: pageSize,
      currentPage: currentPage,
    },
  });

  return { products: data?.products?.items || [], loading, error };
};
