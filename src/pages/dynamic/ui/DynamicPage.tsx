import { useLocation } from 'react-router';
import { CategoryPage } from '@pages/category';
import { useUrlResolve } from '@entities/route';
import { getRelativePath } from '@shared/lib';
import { UrlRewriteEntityTypeEnum } from '@shared/types';
import { Alert, Container, Spinner } from '@shared/ui';

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
  if (error) return <p>{error.message}</p>;
  if (!route) return <Alert>Page not found</Alert>;

  // TODO: handle 'Product page' and 'Cms page'
  switch (route.type) {
    case UrlRewriteEntityTypeEnum.CATEGORY:
      return <CategoryPage urlPath={relativeUrl} />;
    default:
      return <Alert>Page not found</Alert>;
  }
}
