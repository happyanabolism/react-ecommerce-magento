import { useCategories } from '@entities/category';

// TODO: pass levels: int
export const useCategoryNav = ({ rootCategoryId }) => {
  const filter = { parent_id: { eq: rootCategoryId } };
  const { categories, ...rest } = useCategories({
    filter,
    skip: !rootCategoryId,
  });

  return {
    categories: categories.filter((subcategory) => subcategory.include_in_menu),
    ...rest,
  };
};
