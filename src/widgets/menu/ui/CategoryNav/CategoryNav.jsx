import { CategoryList } from '@entities/category';
import { useCategoryNav } from '../../model/useCategoryNav';

export function CategoryNav() {
  const { categories, loading, error } = useCategoryNav();

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <nav>
      {categories && (
        <CategoryList categories={categories} />
      )}
    </nav>
  );
}
