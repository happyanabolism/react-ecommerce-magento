import { useCategories, CategoryList } from '@entities/category';

export function CategoryNav() {
  const filter = {}

  const { categories, loading, error } = useCategories(filter);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <nav>
      <CategoryList categories={categories} />
    </nav>
  );
}
