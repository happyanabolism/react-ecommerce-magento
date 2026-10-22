import { cn } from 'cn';
import { ProductCard } from '@entities/product';
import { Alert, AlertDescription, Pagination, Spinner } from '@shared/ui';
import {
  useProductListing,
  type ProductListingCriteria,
} from '@features/product-listing';
import { AddToWishlistButton } from '@features/wishlist-update';

interface CategoryProductListingProps {
  criteria: ProductListingCriteria;
}

export const CategoryProductListing = ({
  criteria,
}: CategoryProductListingProps) => {
  const {
    data,
    currentPage,
    getPageHref,
    isPending,
    isPlaceholderData,
    error,
  } = useProductListing(criteria);

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

  const { products, pageInfo } = data;

  return (
    <div className='flex flex-col gap-8'>
      <div
        aria-busy={isPlaceholderData}
        className={cn(
          'grid grid-cols-2 gap-4 transition-opacity md:grid-cols-3 lg:grid-cols-4',
          isPlaceholderData && 'pointer-events-none opacity-50'
        )}
      >
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.uid}
            quickActions={
              product.sku ? <AddToWishlistButton sku={product.sku} /> : null
            }
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={pageInfo?.total_pages}
        getPageHref={getPageHref}
      />
    </div>
  );
};
