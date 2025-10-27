import { ProductGrid } from '@entities/product';

export function CategoryProductsGrid({ category, columns }) {
  return <ProductGrid products={category?.products?.items} columns={columns} />
}
