import { useCategory } from '@entities/category';
import { ROOT_CATEGORY_ID } from '@shared/constants';

// TODO: pass levels: int
export const useCategoryNav = () => {
  const filter = { parent_id: { eq: ROOT_CATEGORY_ID } };

  return useCategory({ filter });
};
