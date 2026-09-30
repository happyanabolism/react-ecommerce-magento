import { useContext } from 'react';
import { CategoryProductsContext } from '@features/category';
import { ProductCard } from '@entities/product';
import { Alert, Grid, Pagination } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/utils';
import styles from './CategoryProductListing.module.scss';

export const CategoryProductListing = () => {
  const {
    items: products,
    error,
    page_info,
    setFilters,
  } = useContext(CategoryProductsContext);

  if (error) return <Alert>{getMagentoErrorMessage(error)}</Alert>;

  const onPageChange = (page: number) => {
    setFilters({
      currentPage: page,
    });
  };

  return (
    <div className={styles.productListing}>
      <Grid>
        {products.map((product) => (
          <ProductCard product={product} key={product.uid} />
        ))}
      </Grid>
      <Pagination
        currentPage={page_info.current_page}
        totalPages={page_info.total_pages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
