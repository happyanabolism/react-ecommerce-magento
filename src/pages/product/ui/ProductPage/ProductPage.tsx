import { ProductImage, ProductPrice } from '@entities/product';
import { ProductOptions } from '@features/product-options';
import { useProductPage } from '../../model/useProductPage';
import {
  Alert,
  AlertDescription,
  Container,
  RichContent,
  Spinner,
} from '@shared/ui';

interface ProductPageProps {
  sku: string;
}

export const ProductPage = ({ sku }: ProductPageProps) => {
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
      <Container>
        <div className='grid gap-8 py-6 md:grid-cols-2 md:items-start'>
          <ProductImage
            className='w-full rounded-xl bg-graphite-100'
            url={product.image?.url}
            alt={product.name}
          />
          <div className='flex flex-col gap-4'>
            <h1>{product.name}</h1>
            <span className='text-sm text-muted-foreground'>
              SKU: {product.sku}
            </span>
            <ProductPrice
              className='text-2xl'
              priceRange={product.price_range}
            />
            <RichContent html={product.description?.html} />
            {product.__typename === 'ConfigurableProduct' &&
              product.configurable_options != null && (
                <ProductOptions options={product.configurable_options} />
              )}
          </div>
        </div>
      </Container>
    </>
  );
};
