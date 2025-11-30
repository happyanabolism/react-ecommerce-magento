import { ProductCard } from '@entities/product';
import type { Product } from '@entities/product/model/types';
import type { SearchResultPageInfo } from '@shared/types';
import { Grid, Pagination } from '@shared/ui';

interface ProductListingProps {
  products: Product[];
  pageInfo: SearchResultPageInfo;
  onPageChange: (page: number) => void;
}

export const ProductListing = ({
  products,
  pageInfo,
  onPageChange,
}: ProductListingProps) => {
  return (
    <>
      <Grid>
        {products.map((product) => (
          <ProductCard product={product} key={product.uid} />
        ))}
      </Grid>
      <Pagination
        currentPage={pageInfo.current_page}
        totalPages={pageInfo.total_pages}
        onPageChange={onPageChange}
      />
    </>
  );
};
