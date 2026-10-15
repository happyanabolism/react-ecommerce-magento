import { useQuery } from '@tanstack/react-query';
import {
  request,
  type ProductPageQuery,
  type ProductPageQueryVariables,
} from '@shared/api';
import { PRODUCT_PAGE } from '../api/productPageApi';

const selectProduct = (data: ProductPageQuery) => data.products?.items?.[0];

export const useProductPage = (variables: ProductPageQueryVariables) => {
  return useQuery({
    queryKey: ['product', 'page', variables],
    queryFn: () => request(PRODUCT_PAGE, variables),
    select: selectProduct,
  });
};
