import { ProductCard } from '@entities/product';

export function ProductList({ products }) {
  return (
    <ol className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  )
}
