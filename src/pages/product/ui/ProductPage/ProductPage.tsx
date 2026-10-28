import { useEffect } from 'react';
import {
  productViewed,
  RecentlyViewedProducts,
} from '@widgets/recently-viewed-products';
import { ProductReviews } from '@widgets/product-reviews';
import { Container } from '@shared/ui';
import { useAppDispatch } from '@shared/lib';
import { REVIEWS_ANCHOR } from '../../config/anchors';
import { ProductMain } from '../ProductMain/ProductMain';

interface ProductPageProps {
  sku: string;
}

export const ProductPage = ({ sku }: ProductPageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(productViewed(sku));
  }, [dispatch, sku]);

  return (
    <Container>
      <ProductMain sku={sku} />
      {/* the wrapper is there while reviews load too, so the link from the rating always has a target */}
      <div id={REVIEWS_ANCHOR}>
        <ProductReviews sku={sku} />
      </div>
      <RecentlyViewedProducts exclude={[sku]} />
    </Container>
  );
};
