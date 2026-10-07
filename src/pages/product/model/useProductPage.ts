import { useQuery } from '@apollo/client/react';
import type { ProductPageQueryVariables } from '@shared/api';
import { PRODUCT_PAGE } from '../api/productPageApi';

export const useProductPage = (variables: ProductPageQueryVariables) => {
  const { data, ...rest } = useQuery(PRODUCT_PAGE, { variables });
  return {
    product: data?.products?.items?.[0],
    ...rest,
  };
};
