import './ProductCard.scss';

export function ProductCard({ product }) {
  // TODO: price, stock status, actions (add to cart feature)
  return (
    <div className="product-card">
      <img
        className="product-card-photo"
        src={product.small_image.url}
        title={product.name}
      />
      <p className="prudct-card-name">{product.name}</p>
    </div>
  );
}
