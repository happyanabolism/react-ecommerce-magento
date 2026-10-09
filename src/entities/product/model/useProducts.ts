import { useQuery } from '@apollo/client/react';
import { PRODUCTS } from '../api/productApi';
import type { ProductsQueryVariables } from '@shared/api';

export const useProducts = ({
  filter,
  pageSize,
  currentPage,
}: ProductsQueryVariables) => {
  const { data, previousData, ...rest } = useQuery(PRODUCTS, {
    variables: {
      filter,
      pageSize,
      currentPage,
    },
  });

  return {
    aggregations: (
      data?.products?.aggregations ||
      previousData?.products?.aggregations ||
      []
    ).filter((aggregation) => aggregation !== null),
    products: (
      data?.products?.items ||
      previousData?.products?.items ||
      []
    ).filter((product) => product !== null),
    pageInfo:
      data?.products?.page_info ?? previousData?.products?.page_info ?? null,
    ...rest,
  };
};
