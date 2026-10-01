import { Link } from 'react-router';

interface CategoryLinkProps {
  category: {
    name?: string | null;
    url_path?: string | null;
  };
}

export function CategoryLink({ category }: CategoryLinkProps) {
  return category.url_path ? (
    <Link to={'/' + category.url_path}>{category.name}</Link>
  ) : (
    <span>{category.name}</span>
  );
}
