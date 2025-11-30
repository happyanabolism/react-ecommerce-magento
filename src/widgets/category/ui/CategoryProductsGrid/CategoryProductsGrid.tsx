import { useSearchParams } from 'react-router';
import { useProducts, ProductGrid } from '@entities/product';
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
  const { items, page_info, loading, error } = useProducts({
    filter,
    currentPage,
  });

  // TODO: Alert component
  if (error) return <p>{error.message}</p>;

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (loading) return <Spinner />;
  if (!loading && items.length === 0) {
    return <p>No products</p>;
  }

  return (
    <>
      <ProductGrid products={items} gap={0} />
      <Pagination
        currentPage={currentPage}
        totalPages={page_info?.total_pages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
