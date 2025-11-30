import { useCategories } from '@entities/category';
import type { Category } from '@entities/category/model/types';

// TODO: pass levels: int
export const useCategoryNav = (
  rootCategoryUid?: string
): {
  categories: Category[] | null;
  loading: boolean;
  error?: Error;
} => {
  const filters = { parent_category_uid: { eq: rootCategoryUid } };
  const { items, loading, error } = useCategories({
    filters,
    skip: !rootCategoryUid,
  });

  return {
    categories: items
      ? items.filter((subcategory) => subcategory.include_in_menu)
      : items,
    loading,
    error,
  };
};
