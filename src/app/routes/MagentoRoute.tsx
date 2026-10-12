import { Navigate, useLocation } from 'react-router';
import { CategoryPage } from '@pages/category';
import { ProductPage } from '@pages/product';
import { useUrlResolve } from './useUrlResolve';
import { getRelativePath } from '@shared/lib';
import { Alert, AlertDescription, Container, Spinner } from '@shared/ui';

export function MagentoRoute() {
  const location = useLocation();
  const relativeUrl = getRelativePath(location.pathname);
  const { route, isPending, error } = useUrlResolve(relativeUrl);

  if (isPending) {
    return (
      <Container>
        <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />
      </Container>
    );
  }
  if (error) return <p>{error.message}</p>;
  if (!route)
    return (
      <Alert>
        <AlertDescription>Page not found</AlertDescription>
      </Alert>
    );

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
        <Alert>
          <AlertDescription>Page not found</AlertDescription>
        </Alert>
      );
    default:
      return (
        <Alert>
          <AlertDescription>Page not found</AlertDescription>
        </Alert>
      );
  }
}
