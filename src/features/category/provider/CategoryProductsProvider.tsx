import type { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { useProducts, type ProductQueryVars } from '@entities/product';
import {
  CategoryProductsContext,
  type CategoryProductsContextValue,
} from '@features/category';
import type { ID } from '@shared/types';

interface CategoryProductsProviderProps {
  children: ReactNode;
  categoryUid: ID | undefined;
}

export const CategoryProductsProvider = ({
  children,
  categoryUid,
}: CategoryProductsProviderProps) => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');

  const { aggregations, items, page_info, loading, error, fetchMore } =
    useProducts({
      filter: {
        category_uid: { eq: categoryUid },
      },
      currentPage: currentPage,
      skip: !categoryUid,
    });

  const setFilters = (filter: Partial<ProductQueryVars>) => {
    fetchMore({
      variables: { ...filter },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult ?? prev;
      },
    }).finally(() => {
      if (filter.currentPage) {
        if (filter.currentPage != null) {
          const url = new URL(window.location.href);
          url.searchParams.set('page', filter.currentPage.toString());
          window.history.replaceState(null, '', url.toString());
        }
      }
    });
  };

  const contextValue: CategoryProductsContextValue = {
    aggregations,
    items,
    page_info,
    loading,
    error,
    setFilters,
  };

  return (
    <CategoryProductsContext.Provider value={contextValue}>
      {children}
    </CategoryProductsContext.Provider>
  );
};
