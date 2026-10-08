import { ProductCard } from '@entities/product';
import { Alert, AlertDescription, Grid, Pagination } from '@shared/ui';
import styles from './CategoryProductListing.module.scss';
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
    <div className={styles.productListing}>
      <Grid>
        {products.map((product) => (
          <ProductCard product={product} key={product.uid} />
        ))}
      </Grid>
      <Pagination
        currentPage={pageInfo?.current_page}
        totalPages={pageInfo?.total_pages}
        onPageChange={setPage}
      />
    </div>
  );
};
