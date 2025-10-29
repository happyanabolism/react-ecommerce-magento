import { useCategory } from '@entities/category';
import { Header } from '@widgets/header';
import { CategoryProductsGrid, ChildCategoriesList } from '@widgets/category';
import { Spinner } from '@shared/ui';

export function CategoryPage({ urlPath }) {
  const filter = { 'url_path': { 'eq': urlPath } }
  const { category, loading, error } = useCategory({ filter });

  return (
    <>
      <title>Category</title>
      <Header />
      <main>
        {loading && (
          <Spinner />
        )}
        {error && (
          <p>{error.message}</p>
        )}
        {!loading && !error && (
          <>
            <ChildCategoriesList category={category} />
            <CategoryProductsGrid category={category} />
          </>
        )}
      </main>
    </>
  )
}
