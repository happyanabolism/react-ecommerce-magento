import { useQuery } from '@apollo/client/react';
import { PRODUCTS } from '../api/productApi';
import type { Product, ProductQuery, ProductQueryVars } from './types';

interface UseProductsResult {
  products: Product[];
  pageInfo?: ProductQuery['products']['page_info'];
  loading: boolean;
  error?: Error;
}

export const useProducts = ({
  filter,
  pageSize,
  currentPage,
}: ProductQueryVars): UseProductsResult => {
  const { data, loading, error } = useQuery<ProductQuery, ProductQueryVars>(
    PRODUCTS,
    {
      variables: {
        filter,
        pageSize: pageSize,
        currentPage: currentPage,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  return {
    products: data?.products.items || [],
    pageInfo: data?.products.page_info,
    loading,
    error,
  };
};
