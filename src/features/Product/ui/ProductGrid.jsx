import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const MAX_GRID_COLUMNS = 4;

function ProductGrid({ products, columns = MAX_GRID_COLUMNS }) {
  const gridClass = `product-grid grid-cols-${columns > MAX_GRID_COLUMNS ? MAX_GRID_COLUMNS : columns}`;

  return (
    <ol className={gridClass}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  )
}

export default ProductGrid;