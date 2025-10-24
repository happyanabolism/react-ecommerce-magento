import { useProducts } from "../model/productsModel";
import ProductCard from "./ProductCard";
import "./ProductGrid.css";

const MAX_GRID_COLUMNS = 4;

function ProductGrid({ categoryId, skus, pageSize, currentPage, columns = MAX_GRID_COLUMNS }) {
  const { products, loading, error } = useProducts({ categoryId, skus, pageSize, currentPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>

  columns = columns > MAX_GRID_COLUMNS ? MAX_GRID_COLUMNS : columns;

  const gridClass = `product-grid grid-cols-${columns}`;

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