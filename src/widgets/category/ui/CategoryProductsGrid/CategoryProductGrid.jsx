import { ProductGrid } from '@entities/product';

export function CategoryProductsGrid({ category, columns }) {
  if (!category?.products?.items || category?.products?.items.length === 0) {
    return (
      <p>No items</p>
    )
  }

  return <ProductGrid products={category?.products?.items} columns={columns} />
}
