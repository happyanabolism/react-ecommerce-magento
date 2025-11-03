import { useProducts, ProductCard } from '@entities/product';
import { ProductGrid } from '@entities/product/ui/ProductGrid/ProductGrid';
import { Spinner } from '@shared/ui';

export function CategoryProductsGrid({ category }) {
  const filter = { 'category_uid': { 'eq': category.uid } };
  const { products, loading, error } = useProducts({ filter });

  if (loading) return <Spinner />;
  // TODO: Alert component
  if (error) return <p>{error.message}</p>;

  if (products.length === 0) {
    return (
      <p>No items</p>
    )
  }

  return (
    <ProductGrid products={products} />
  );
}
