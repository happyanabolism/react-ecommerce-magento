import { useSearchParams } from 'react-router';
import { ProductListing } from '@widgets/product';
import { ProductFilters } from '@features/product';
import { useProducts } from '@entities/product';
import type { ID } from '@shared/types';
import { Alert, Spinner } from '@shared/ui';

interface FilterableProductListingProps {
  categoryUid: ID;
}

export const FilterableProductListing = ({
  categoryUid,
}: FilterableProductListingProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get('page') ?? '1');

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() }, { replace: true });

    fetchMore({
      variables: {
        currentPage: page,
      },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult ?? prev,
    });
  };

  const { aggregations, items, page_info, loading, error, fetchMore } =
    useProducts({
      filter: { category_uid: { eq: categoryUid } },
      currentPage: initialPage,
      skip: !categoryUid,
    });

  if (loading) return <Spinner />;
  if (error) return <Alert type='error'>{error.message}</Alert>;

  return (
    <>
      <aside>
        <ProductFilters aggregations={aggregations} />
      </aside>
      <ProductListing
        products={items}
        pageInfo={page_info}
        onPageChange={handlePageChange}
      />
    </>
  );
};
