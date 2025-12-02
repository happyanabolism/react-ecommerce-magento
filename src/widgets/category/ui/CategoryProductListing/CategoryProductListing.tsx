import { useContext } from 'react';
import { CategoryProductsContext } from '@features/category';
import { ProductCard } from '@entities/product';
import { Alert, Grid, Pagination, Spinner } from '@shared/ui';
import styles from './CategoryProductListing.module.scss';

export const CategoryProductListing = () => {
  const {
    items: products,
    loading,
    error,
    page_info,
    setFilters,
  } = useContext(CategoryProductsContext);

  //if (loading) return <Spinner />;
  if (error) return <Alert>{error.message}</Alert>;

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
