import { useCategoryMenu } from '@entities/category';

export const useCategoryNav = ({
  rootCategoryUid,
  limit,
}: {
  rootCategoryUid?: string;
  limit?: number;
}): ReturnType<typeof useCategoryMenu> => {
  const { categories, ...rest } = useCategoryMenu({
    rootUid: rootCategoryUid,
  });

  return {
    categories: categories
      .filter((subcategory) => subcategory.include_in_menu)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .slice(0, limit),
    ...rest,
  };
};
