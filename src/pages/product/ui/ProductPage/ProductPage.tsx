import { useProductPage } from '../../model/useProductPage';
import { ProductImage, ProductPrice } from '@entities/product';
import { getMagentoErrorMessage } from '@shared/api';
import { Alert, Container, RichContent, Spinner } from '@shared/ui';
import styles from './ProductPage.module.scss';

interface ProductPageProps {
  sku: string;
}

export const ProductPage = ({ sku }: ProductPageProps) => {
  const { product, loading, error } = useProductPage({ sku });

  if (loading && !product) return <Spinner />;
  if (error) return <Alert type='error'>{getMagentoErrorMessage(error)}</Alert>;
  if (!product) return <Alert type='error'>Product not found</Alert>;

  return (
    <>
      <title>{product.name}</title>
      <Container>
        <div className={styles.productPage}>
          <ProductImage
            className={styles.image}
            url={product.image?.url}
            alt={product.name}
          />
          <div className={styles.info}>
            <h1 className={styles.name}>{product.name}</h1>
            <span className={styles.sku}>SKU: {product.sku}</span>
            <ProductPrice
              className={styles.price}
              priceRange={product.price_range}
            />
            <RichContent html={product.description?.html} />
          </div>
        </div>
      </Container>
    </>
  );
};
