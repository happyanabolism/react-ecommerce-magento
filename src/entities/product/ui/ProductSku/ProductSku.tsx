interface ProductSkuProps {
  sku: string | null;
}

export const ProductSku = ({ sku }: ProductSkuProps) => {
  if (!sku) return null;
  return <span className='text-sm text-muted-foreground'>SKU: {sku}</span>;
};
