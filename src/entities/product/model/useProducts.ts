import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PRODUCTS } from '../api/productApi';
import { request, type ProductsQueryVariables } from '@shared/api';

export const useProducts = ({
  filter,
  pageSize,
  currentPage,
}: ProductsQueryVariables) => {
  const { data, ...rest } = useQuery({
    queryKey: ['products', { filter, pageSize, currentPage }],
    queryFn: () =>
      request(PRODUCTS, {
        filter,
        pageSize,
        currentPage,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    products: (data?.products?.items || []).filter(
      (product) => product !== null
    ),
    pageInfo: data?.products?.page_info ?? null,
    ...rest,
  };
};
