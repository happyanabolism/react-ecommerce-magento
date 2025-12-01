import { useQuery } from '@apollo/client/react';
import { PRODUCTS } from '../api/productApi';
import type { ProductQuery, ProductQueryVars, Products } from './types';

type UseProductsResult = Products &
  Omit<ReturnType<typeof useQuery<ProductQuery, ProductQueryVars>>, 'data'>;

export const useProducts = ({
  filter,
  pageSize,
  currentPage,
  skip = false,
}: ProductQueryVars & { skip?: boolean }): UseProductsResult => {
  const { data, ...rest } = useQuery<ProductQuery, ProductQueryVars>(PRODUCTS, {
    variables: {
      filter,
      pageSize,
      currentPage,
    },
    skip,
  });

  return {
    aggregations: data?.products.aggregations || [],
    items: data?.products.items || [],
    page_info: data?.products.page_info || {},
    ...rest,
  };
};
