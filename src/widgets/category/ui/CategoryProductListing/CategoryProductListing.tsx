import { cn } from 'cn';
import { ProductCard } from '@entities/product';
import { Alert, AlertDescription, Pagination, Spinner } from '@shared/ui';
import {
  useProductListing,
  type ProductListingCriteria,
} from '@features/product-listing';
import { getMagentoErrorMessage } from '@shared/api';

interface CategoryProductListingProps {
  criteria: ProductListingCriteria;
}

export const CategoryProductListing = ({
  criteria,
}: CategoryProductListingProps) => {
  const { products, pageInfo, currentPage, getPageHref, loading, error } =
    useProductListing(criteria);

  if (loading && !pageInfo)
    return (
      <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />
    );

  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
      </Alert>
    );

  return (
    <div className='flex flex-col gap-8'>
      <div
        aria-busy={loading}
        className={cn(
          'grid grid-cols-2 gap-4 transition-opacity md:grid-cols-3 lg:grid-cols-4',
          loading && 'pointer-events-none opacity-50'
        )}
      >
        {products.map((product) => (
          <ProductCard product={product} key={product.uid} />
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
