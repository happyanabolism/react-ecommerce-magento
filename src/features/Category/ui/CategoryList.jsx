import { useCategoies } from "../model/сategoriesModel";

function CategoryList({ parentCategoryId, pageSize, currentPage }) {
  const { categories, loading, error } = useCategoies({ parentCategoryId, pageSize, currentPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ol>
      {categories.map(category => (
        <li key={category.id}>{category.name}</li>
      ))}
    </ol>
  );
}

export default CategoryList;