import { CategoryList } from '@entities/category';

export function ChildCategoriesList({ category }) {
  return (
    <CategoryList categories={category?.children} />
  );
}
