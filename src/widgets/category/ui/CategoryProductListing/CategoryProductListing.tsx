import { ProductCard } from '@entities/product';
import { Alert, AlertDescription, Pagination } from '@shared/ui';
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
  const { products, pageInfo, setPage, error } = useProductListing(criteria);

  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{getMagentoErrorMessage(error)}</AlertDescription>
      </Alert>
    );
  return (
    <div className='flex flex-col gap-8'>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {products.map((product) => (
          <ProductCard product={product} key={product.uid} />
        ))}
      </div>
      <Pagination
        currentPage={pageInfo?.current_page}
        totalPages={pageInfo?.total_pages}
        onPageChange={setPage}
      />
    </div>
  );
};
