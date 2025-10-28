import { ROOT_CATEGORY_ID, useCategory } from '@entities/category';

// TODO: pass levels: int
export const useCategoryNav = () => {
  const filter = { parent_id: { eq: ROOT_CATEGORY_ID } };

  return useCategory({ filter, includeProducts: false });
};
