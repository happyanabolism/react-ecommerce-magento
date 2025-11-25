import type { Product } from '@entities/product/model/types';
import styles from './ProductCard.module.scss';
import { ProductImage } from '../ProductImage/ProductImage';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // TODO: price, stock status, actions (add to cart feature)
  return (
    <div className={styles.productCard}>
      <ProductImage
        className={styles.productPhoto}
        image={product.small_image}
        productName={product.name}
      />
      <p className='prudct-card-name'>{product.name}</p>
    </div>
  );
}
