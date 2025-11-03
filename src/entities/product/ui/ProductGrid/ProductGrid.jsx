import { ProductCard } from "@entities/product";
import { Grid } from "@shared/ui"

export const ProductGrid = ({
  products,
  columns,
  gap,
  className,
  ...rest
}) => {
  return (
    <Grid columns={columns} gap={gap} className={className} {...rest}>
      {products && products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </Grid>
  );
}
