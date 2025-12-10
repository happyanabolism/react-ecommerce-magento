import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { useProducts, type ProductQueryVars } from '@entities/product';
import {
  CategoryProductsContext,
  useCategorySearchParams,
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
  const [{ currentPage }, setCategorySearchParams] = useCategorySearchParams();

  const { aggregations, items, page_info, loading, error } = useProducts({
    filter: {
      category_uid: { eq: categoryUid },
    },
    currentPage,
    skip: !categoryUid,
  });

  const contextValue: CategoryProductsContextValue = {
    aggregations,
    items,
    page_info,
    loading,
    error,
    setFilters: setCategorySearchParams,
  };

  return (
    <CategoryProductsContext.Provider value={contextValue}>
      {children}
    </CategoryProductsContext.Provider>
  );
};
