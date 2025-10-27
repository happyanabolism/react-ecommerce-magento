import { useLocation } from 'react-router';
import { useCategory } from '@entities/category';
import { Header } from '@widgets/header';
import { CategoryProductsGrid } from '@widgets/category';
import { ChildCategoriesList } from '@widgets/category';
import { ROUTE_CONSTANTS } from '@shared/config';

export function CategoryPage() {
  const location = useLocation();
  const urlPath = location.pathname.replace(
    ROUTE_CONSTANTS.CATEGORY_VIEW.replace('*', ''),
    ''
  );

  const filter = {
    'url_path': {
      'eq': urlPath
    }
  }

  const { category, loading, error } = useCategory(filter);

  return (
    <>
      <title>Category</title>
      <Header />
      <main>
        {loading && (
          <p>Loading...</p>
        )}
        {error && (
          <p>{error.message}</p>
        )}
        {!loading && !error && (
          <>
            <ChildCategoriesList category={category} />
            <CategoryProductsGrid category={category} columns={4} />
          </>
        )}
      </main>
    </>
  )
}
