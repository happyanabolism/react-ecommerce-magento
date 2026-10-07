import { Navigate, useLocation } from 'react-router';
import { CategoryPage } from '@pages/category';
import { ProductPage } from '@pages/product';
import { useUrlResolve } from './useUrlResolve';
import { getRelativePath } from '@shared/lib';
import { Alert, Container, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';

export function MagentoRoute() {
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
    case 'SimpleProduct':
    case 'BundleProduct':
    case 'ConfigurableProduct':
    case 'GroupedProduct':
    case 'DownloadableProduct':
    case 'VirtualProduct':
      return route.sku ? (
        <ProductPage sku={route.sku} />
      ) : (
        <Alert>Page not found</Alert>
      );
    default:
      return <Alert>Page not found</Alert>;
  }
}
