import { useSearchParams } from 'react-router';
import {
  useProducts,
  type ProductQueryVars,
  type UseProductsResult,
} from '@entities/product';
import type { ID } from '@shared/types';

interface UseCategoryProducts extends UseProductsResult {
  setFilter: (filter: Partial<ProductQueryVars>) => Promise<void>;
}

export const useCategoryProducts = (categoryUid?: ID): UseCategoryProducts => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = parseInt(searchParams.get('page') ?? '1');

  const { fetchMore, ...rest } = useProducts({
    filter: { category_uid: { eq: categoryUid } },
    currentPage: initialPage,
    skip: !categoryUid,
  });

  const setFilter = async (
    filter: Partial<ProductQueryVars>
  ): Promise<void> => {
    const params = Object.fromEntries(searchParams.entries());

    if (filter?.currentPage) params.page = filter.currentPage.toString();

    await fetchMore({
      variables: { currentPage: filter.currentPage },
      updateQuery: (prev, { fetchMoreResult }) => fetchMoreResult ?? prev,
    });

    // TODO: remake with useState and window.histoty.replaceState to avoid useless rerenders
    // setSearchParams(params, { replace: true });
  };

  return { fetchMore, setFilter, ...rest };
};
