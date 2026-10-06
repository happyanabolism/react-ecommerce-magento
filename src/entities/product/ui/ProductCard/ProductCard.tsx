import styles from './ProductCard.module.scss';
import { ProductImage } from '../ProductImage/ProductImage';
import type { ProductCardFieldsFragment } from '@shared/api';

export function ProductCard({
  product,
}: {
  product: ProductCardFieldsFragment;
}) {
  // TODO: price, stock status, actions (add to cart feature)
  return (
    <div className={styles.productCard}>
      <ProductImage
        className={styles.productPhoto}
        url={product?.small_image?.url}
        alt={product?.name}
      />
      <p className='prudct-card-name'>{product.name}</p>
    </div>
  );
}
