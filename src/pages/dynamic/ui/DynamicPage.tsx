import { Navigate, useLocation } from 'react-router';
import { CategoryPage } from '@pages/category';
import { useUrlResolve } from '@entities/route';
import { getRelativePath } from '@shared/lib';
import { Alert, Container, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/utils';

export function DynamicPage() {
  const location = useLocation();
  const relativeUrl = getRelativePath(location.pathname);
  const { route, loading, error } = useUrlResolve(relativeUrl);

  if (loading) {
    return (
      <Container>
        <Spinner />
      </Container>
    );
  }
  if (error) return <p>{getMagentoErrorMessage(error)}</p>;
  if (!route) return <Alert>Page not found</Alert>;

  if (route.redirect_code !== 0 && route.relative_url) {
    return <Navigate to={'/' + route.relative_url} replace />;
  }

  // TODO: handle 'Product page' and 'Cms page'
  switch (route.__typename) {
    case 'CategoryTree':
      return <CategoryPage category={route} />;
    default:
      return <Alert>Page not found</Alert>;
  }
}
