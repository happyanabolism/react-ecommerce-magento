import styles from './ProductCard.module.scss';

export function ProductCard({ product }) {
  // TODO: price, stock status, actions (add to cart feature)
  return (
    <div className={styles.productCard}>
      <img
        className={styles.productPhoto}
        src={product.small_image.url}
        title={product.name}
      />
      <p className="prudct-card-name">{product.name}</p>
    </div>
  );
}
