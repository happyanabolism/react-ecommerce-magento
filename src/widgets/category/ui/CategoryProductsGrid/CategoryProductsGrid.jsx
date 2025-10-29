import { useProducts, ProductCard } from '@entities/product';
import { Spinner } from '@shared/ui';
import './index.scss';

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

  // TODO: Grid component
  return (
    <div className="grid">
      {products && products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
