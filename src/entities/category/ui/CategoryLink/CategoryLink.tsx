import { Link } from 'react-router';
import type { Category } from '@entities/category/model/types';

interface CategoryLinkProps {
  category: Pick<Category, 'name' | 'url_path'>;
}

export function CategoryLink({ category }: CategoryLinkProps) {
  return category.url_path ? (
    <Link to={'/' + category.url_path}>{category.name}</Link>
  ) : (
    <span>{category.name}</span>
  );
}
