import { Link } from "react-router";
import { useCategoies } from "../model/сategoriesModel";

function CategoryList({ parentCategoryId, pageSize, currentPage }) {
  const { categories, loading, error } = useCategoies({ parentCategoryId, pageSize, currentPage });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ol>
      {categories.map(category => (
        <li key={category.id}>
          <Link to={`category/${category.url_key}`}>
            {category.name}
          </Link>
        </li>
      ))}
    </ol>
  );
}

export default CategoryList;