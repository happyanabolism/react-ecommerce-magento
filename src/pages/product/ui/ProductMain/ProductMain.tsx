import { useProductPage } from '../../model/useProductPage';
import { Alert, AlertDescription, Spinner } from '@shared/ui';
import { ProductDetails } from '../ProductDetails/ProductDetails';

interface ProductMainProps {
  sku: string;
}

export const ProductMain = ({ sku }: ProductMainProps) => {
  const { product, isPending, error } = useProductPage({ sku });

  if (isPending)
    return (
      <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />
    );
  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  if (!product)
    return (
      <Alert variant='destructive'>
        <AlertDescription>Product not found</AlertDescription>
      </Alert>
    );

  return (
    <>
      <title>{product.name}</title>
      <ProductDetails product={product} />
    </>
  );
};
