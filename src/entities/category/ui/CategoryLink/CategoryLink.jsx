import { generatePath, Link } from 'react-router';
import { ROUTES } from '@shared/constants';

export function CategoryLink({ category }) {
  return (
    <>
      {category.url_path ? (
        <Link to={generatePath(ROUTES.CATEGORY, { 'uid': category.uid })}>
          {category.name}
        </Link>
      ) : (
        <span>{category.name}</span>
      )}
    </>
  );
}
