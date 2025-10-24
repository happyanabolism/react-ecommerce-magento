import './ProductCard.css';

function ProductCard({ product }) {
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

export default ProductCard;