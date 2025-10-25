import { useQuery } from '@apollo/client/react';
import { GET_PRODUCT_ATTRIBUTES_LIST, GET_PRODUCTS } from "../api/productsApi"

export const useProducts = ({ categoryId, skus, pageSize = 20, currentPage = 1 }) => {
  let filter = {};

  if (categoryId) filter = { category_id: { eq: categoryId } };
  else if (skus) filter = { sku: { in: skus } };

  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: filter,
      pageSize: pageSize,
      currentPage: currentPage
    }
  });

  return { products: data?.products?.items || [], loading, error};
}