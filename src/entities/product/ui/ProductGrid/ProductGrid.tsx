import { ProductCard } from '@entities/product';
import { Grid, Spinner } from '@shared/ui';

interface ProductGridProps {
  className?: string;
  columns?: number;
  gap?: number;
  products: any[];
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
      {products &&
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
    </Grid>
  );
};
