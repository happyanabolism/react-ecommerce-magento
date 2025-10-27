import { Link } from "react-router";
import { getCategoryRoute } from "@shared/config";

export function CategoryLink({ category }) {
  return (
    <>
      {category.url_path ? (
        <Link to={getCategoryRoute(category.url_path)}>
          {category.name}
        </Link>
      ) : (
        <span>{category.name}</span>
      )}
    </>
  );
}