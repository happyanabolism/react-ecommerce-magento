import { useEffect } from 'react';
import {
  productViewed,
  RecentlyViewedProducts,
} from '@widgets/recently-viewed-products';
import { Container } from '@shared/ui';
import { useAppDispatch } from '@shared/lib';
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
      <RecentlyViewedProducts exclude={[sku]} />
    </Container>
  );
};
