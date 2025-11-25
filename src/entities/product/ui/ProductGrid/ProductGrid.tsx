import { ProductCard } from '@entities/product';
import type { Product } from '@entities/product/model/types';
import { Grid, Spinner } from '@shared/ui';

interface ProductGridProps {
  className?: string;
  columns?: number;
  gap?: number;
  products: Product[];
}

export const ProductGrid = ({
  className,
  columns,
  gap,
  products,
}: ProductGridProps) => {
  if (products.length === 0) return <Spinner />;

  return (
    <Grid columns={columns} gap={gap} className={className}>
      {products.map((product) => (
        <ProductCard product={product} key={product.uid} />
      ))}
    </Grid>
  );
};
