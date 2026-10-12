import { useQuery } from '@tanstack/react-query';
import { request, type ProductPageQueryVariables } from '@shared/api';
import { PRODUCT_PAGE } from '../api/productPageApi';

export const useProductPage = (variables: ProductPageQueryVariables) => {
  const { data, ...rest } = useQuery({
    queryKey: ['product', 'page', variables],
    queryFn: () => request(PRODUCT_PAGE, variables),
  });

  return {
    product: data?.products?.items?.[0],
    ...rest,
  };
};
