import { type ReactNode } from 'react';
import { useProducts } from '@entities/product';
import {
  CategoryProductsContext,
  useCategorySearchParams,
  type CategoryProductsContextValue,
} from '@features/category';
import type { ID, FilterEqualTypeInput } from '@shared/types';

interface CategoryProductsProviderProps {
  children: ReactNode;
  categoryUid: ID | undefined;
}

export const CategoryProductsProvider = ({
  children,
  categoryUid,
}: CategoryProductsProviderProps) => {
  const [{ currentPage, filter }, setCategorySearchParams] =
    useCategorySearchParams();

  const mappedFilters: Record<string, FilterEqualTypeInput> = {};

  if (filter) {
    Object.entries(filter).forEach(([attribute, values]) => {
      if (!values || values.length === 0) return;

      mappedFilters[attribute] =
        values.length === 1 ? { eq: values[0] } : { in: values };
    });
  }

  const { aggregations, items, page_info, loading, error } = useProducts({
    filter: {
      ...mappedFilters,
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
