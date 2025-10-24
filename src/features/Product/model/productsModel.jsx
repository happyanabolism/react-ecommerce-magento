import { useProductsQuery } from "../api/productsApi"

export const useProducts = ({ categoryId, skus, pageSize = 20, currentPage = 1 }) => {
  let filter = {};

  if (categoryId) filter = { category_id: { eq: categoryId } };
  else if (skus) filter = { sku: { in: skus } };

  const { data, loading, error } = useProductsQuery({ filter, pageSize, currentPage });

  return { products: data?.products?.items || [], loading, error};
}