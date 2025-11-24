import { useSearchParams } from 'react-router';
import { useProducts, ProductCard } from '@entities/product';
import { ProductGrid } from '@entities/product/ui/ProductGrid/ProductGrid';
import { Pagination, Spinner } from '@shared/ui';

interface CategoryProductsGridProps {
  categoryUid: string;
}

export function CategoryProductsGrid({
  categoryUid,
}: CategoryProductsGridProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');

  const filter = { category_uid: { eq: categoryUid } };
  const { products, pageInfo, loading, error } = useProducts({
    filter,
    currentPage,
  });

  // TODO: Alert component
  if (error) return <p>{error.message}</p>;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      {!loading && <ProductGrid products={products} gap={0} />}
      {loading && <Spinner />}
      <Pagination
        currentPage={currentPage}
        totalPages={pageInfo?.total_pages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
