import { ProductGrid } from '@entities/product/ui';
import { useCategoiesWithProducts } from "@entities/category/model";

export function CategoryProductsGrid({ urlPath, pageSize, currentPage, columns}) {
  const { category, loading, error } = useCategoiesWithProducts({ urlPath, pageSize, currentPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>

  return <ProductGrid products={category?.products?.items} columns={columns} />
}