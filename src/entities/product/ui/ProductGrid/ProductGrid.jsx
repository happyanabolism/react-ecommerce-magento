import { ProductCard } from "@entities/product";
import { Grid, Spinner } from "@shared/ui"

export const ProductGrid = ({
  products,
  columns,
  gap,
  className,
  ...rest
}) => {
  if (products.length === 0) return <Spinner />

  return (
    <Grid columns={columns} gap={gap} className={className} {...rest}>
      {products && products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
}
