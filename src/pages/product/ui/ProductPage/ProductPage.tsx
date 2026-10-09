import { useProductPage } from '../../model/useProductPage';
import { ProductImage, ProductPrice } from '@entities/product';
import { getMagentoErrorMessage } from '@shared/api';
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
  const { product, loading, error } = useProductPage({ sku });

  if (loading && !product) return <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />;
  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
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
          </div>
        </div>
      </Container>
    </>
  );
};
