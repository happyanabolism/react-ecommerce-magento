import { useCategories } from '@entities/category';
import { ROOT_CATEGORY_ID } from '@shared/constants';

// TODO: pass levels: int
export const useCategoryNav = () => {
  const filter = { parent_id: { eq: ROOT_CATEGORY_ID } };
  const { categories, ...rest } = useCategories({ filter });

  return {
    categories: categories.filter((subcategory) => subcategory.include_in_menu),
    ...rest,
  };
};
