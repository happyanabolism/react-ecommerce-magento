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
  const { categories, loading, error } = useCategories({
    filters,
    skip: !rootCategoryUid,
  });

  return {
    categories: categories
      ? categories.filter((subcategory) => subcategory.include_in_menu)
      : categories,
    loading,
    error,
  };
};
