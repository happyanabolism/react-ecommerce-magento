import { ProductCard, ProductsContext } from '@entities/product';
import type { Product } from '@entities/product/model/types';
import type { SearchResultPageInfo } from '@shared/types';
import { Grid, Pagination, Spinner } from '@shared/ui';
import styles from './ProductListing.module.scss';
import { useContext } from 'react';

export const ProductListing = () => {
  const context = useContext(ProductsContext);

  if (!context || context?.loading) {
    return <Spinner />;
  }

  const { items: products, page_info } = context;

  const onPageChange = (page: number) => {
    console.log(page);
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
