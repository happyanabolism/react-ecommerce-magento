import ProductCard from "./ProductCard";

function ProductList({ products }) {
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