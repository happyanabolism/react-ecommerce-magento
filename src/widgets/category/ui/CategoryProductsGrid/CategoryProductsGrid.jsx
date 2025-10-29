import { useProducts, ProductCard } from '@entities/product';
import './index.scss';

export function CategoryProductsGrid({ category }) {
  const filter = { 'category_uid': { 'eq': category.uid } };
  const { products, loading, error } = useProducts({ filter });


  // TODO: Spiner component
  if (loading) return <p>Loading products...</p>;
  // TODO: Alert component
  if (error) return <p>{error.message}</p>;

  if (products.length === 0) {
    return (
      <p>No items</p>
    )
  }

  // TODO: Grid component
  return (
    <div className="grid">
      {products && products.map(product => (
        <ProductCard product={product} />
      ))}
    </div>
  );
}
