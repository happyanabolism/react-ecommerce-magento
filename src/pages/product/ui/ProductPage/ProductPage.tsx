import { Container } from '@shared/ui';
import { ProductMain } from '../ProductMain/ProductMain';

interface ProductPageProps {
  sku: string;
}

export const ProductPage = ({ sku }: ProductPageProps) => {
  return (
    <Container>
      <ProductMain sku={sku} />
    </Container>
  );
};
