import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PRODUCTS } from '../api/productApi';
import {
  request,
  type ProductsQuery,
  type ProductsQueryVariables,
} from '@shared/api';

const selectProducts = (data: ProductsQuery) => ({
  products: (data.products?.items || []).filter((product) => product !== null),
  pageInfo: data.products?.page_info ?? null,
});

export const useProducts = ({
  filter,
  search,
  pageSize,
  currentPage,
}: ProductsQueryVariables) => {
  return useQuery({
    queryKey: ['products', { filter, search, pageSize, currentPage }],
    queryFn: () =>
      request(PRODUCTS, {
        filter,
        search,
        pageSize,
        currentPage,
      }),
    select: selectProducts,
    placeholderData: keepPreviousData,
  });
};
