import { useState } from "react";
import { useSearchParams } from "react-router";
import { useProducts, ProductCard } from "@entities/product";
import { ProductGrid } from "@entities/product/ui/ProductGrid/ProductGrid";
import { Pagination, Spinner } from "@shared/ui";

export function CategoryProductsGrid({ category }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const filter = { "category_uid": { "eq": category.uid } };
  const { products, pageInfo, loading, error } = useProducts({ filter, currentPage });

  if (loading) return <Spinner />;
  // TODO: Alert component
  if (error) return <p>{error.message}</p>;

  if (products.length === 0) {
    return (
      <p>No items</p>
    )
  }

  const handlePageChange = (page) => {
    setSearchParams({ page });
  }

  return (
    <>
      <Pagination currentPage={currentPage} totalPages={pageInfo.total_pages} onPageChange={handlePageChange} />
      <ProductGrid products={products} gap={0} />
    </>
  );
}
