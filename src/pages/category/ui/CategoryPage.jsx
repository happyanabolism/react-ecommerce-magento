import { useLocation } from 'react-router';
import { Header } from '@widgets/header';
import { CategoryProductsGrid } from '@widgets/category/ui';

export function CategoryPage() {
  const location = useLocation();
  const urlPath = location.pathname.replace('/category/', '');

  return (
    <>
      <title>Category</title>
      <Header />
      <main>
        <CategoryProductsGrid urlPath={urlPath} columns={4} />
      </main>
    </>
  )
}