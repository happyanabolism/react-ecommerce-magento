import { CategoryList } from '@entities/category';
import { useCategoryNav } from '../../model/useCategoryNav';

export function CategoryNav() {
  const { category, loading, error } = useCategoryNav();

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <nav>
      {category?.children && (
        <CategoryList categories={category?.children.filter((subcategory) => subcategory.include_in_menu)} />
      )}
    </nav>
  );
}
