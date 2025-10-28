import { useProducts, ProductGrid } from '@entities/product';

export function CategoryProductsGrid({ categoryUid, columns }) {
  const filter = { 'category_uid': { 'eq': categoryUid } };
  const { products, loading, error } = useProducts({ filter });

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error.message}</p>;

  if (products.length === 0) {
    return (
      <p>No items</p>
    )
  }

  return <ProductGrid products={products} columns={columns} />
}
