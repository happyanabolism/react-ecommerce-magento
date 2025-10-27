import { useCategoies } from '@entities/category/model';
import { CategoryLink } from '@entities/category/ui';

export function CategoryList({ parentCategoryId, pageSize, currentPage }) {
  const { categories, loading, error } = useCategoies({ parentCategoryId, pageSize, currentPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ol>
      {categories.map(category => (
        <li key={category.id}>
          <CategoryLink category={category} />
        </li>
      ))}
    </ol>
  );
}