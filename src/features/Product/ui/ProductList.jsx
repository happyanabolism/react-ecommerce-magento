import { useProducts } from "../model/productsModel";
import ProductCard from "./ProductCard";

function ProductList({ categoryId, skus, pageSize, currentPage }) {
  const { products, loading, error } = useProducts({ categoryId, skus, pageSize, currentPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>

  return (
    <ol className="product-list">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  )
}

export default ProductList;