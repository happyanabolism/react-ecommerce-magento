import { useQuery, type QueryResult } from '@apollo/client/react';
import type { SearchResultPageInfo } from '@shared/types';
import { PRODUCTS } from '../api/productApi';
import type { Product, ProductQuery, ProductQueryVars } from './types';

interface UseProductsResult
  extends Omit<
    ReturnType<typeof useQuery<ProductQuery, ProductQueryVars>>,
    'data'
  > {
  products: Product[];
  pageInfo?: SearchResultPageInfo;
}

export const useProducts = ({
  filter,
  pageSize,
  currentPage,
  skip = false,
}: ProductQueryVars & { skip?: boolean }): UseProductsResult => {
  const { data, ...rest } = useQuery<ProductQuery, ProductQueryVars>(PRODUCTS, {
    variables: {
      filter,
      pageSize: pageSize,
      currentPage: currentPage,
    },
    skip,
    fetchPolicy: 'cache-and-network',
  });

  return {
    products: data?.products.items || [],
    pageInfo: data?.products.page_info,
    ...rest,
  };
};
