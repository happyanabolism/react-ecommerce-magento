import { request, type ProductSearchQuery } from '@shared/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PRODUCT_SEARCH } from '../api/api';

const SEARCH_RESULT_PRODUCTS_SIZE_LIMIT = 5;

const selectProductSearchResult = (data: ProductSearchQuery) => {
  return {
    products: (data.products?.items ?? []).filter((item) => item != null),
    suggestions: (data.products?.suggestions ?? []).filter(
      (item) => item != null
    ),
    totalCount: data.products?.total_count ?? 0,
  };
};

export const useProductSearch = (search: string) => {
  return useQuery({
    queryKey: ['search', 'products', search],
    queryFn: () => {
      return request(PRODUCT_SEARCH, {
        search,
        pageSize: SEARCH_RESULT_PRODUCTS_SIZE_LIMIT,
      });
    },
    select: selectProductSearchResult,
    placeholderData: keepPreviousData,
    enabled: !!search,
  });
};
