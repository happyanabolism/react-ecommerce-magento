import { Link } from 'react-router';

export function CategoryLink({ category }) {
  return (
    <>
      {category.url_path ? (
        <Link to={'/' + category.url_path}>
          {category.name}
        </Link>
      ) : (
        <span>{category.name}</span>
      )}
    </>
  );
}
