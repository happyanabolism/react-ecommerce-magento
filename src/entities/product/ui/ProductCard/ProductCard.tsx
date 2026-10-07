import { Link } from 'react-router';
import styles from './ProductCard.module.scss';
import { ProductImage } from '../ProductImage/ProductImage';
import type { ProductCardFieldsFragment } from '@shared/api';
import { ProductPrice } from '../ProductPrice/ProductPrice';

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
        url={product.small_image?.url}
        alt={product.name}
      />
      <div>
        <Link to={'/' + product.url_key} className={styles.productLinkName}>
          {product.name}
        </Link>
        <ProductPrice priceRange={product.price_range} />
      </div>
    </div>
  );
}
