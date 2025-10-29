
import { useLocation } from 'react-router'
import { CategoryPage } from '@pages/category';
import { useUrlResolve } from '@entities/route'
import { getRelativePath } from '@shared/lib'
import { PAGE_TYPES } from '@shared/constants';
import { Spinner } from '@shared/ui';

export function DynamicPage() {
  const location = useLocation();
  const relativeUrl = getRelativePath(location.pathname);
  const { route, loading, error } = useUrlResolve(relativeUrl);

  if (loading) return <Spinner />;
  if (error) return <p>{error.message}</p>;


  // TODO: handle 'Product page' and 'Cms page'
  switch (route.type) {
    case PAGE_TYPES.CATEGORY:
      return <CategoryPage urlPath={relativeUrl} />
    default:
      return <p>PageNotFoud</p>
  }
}
