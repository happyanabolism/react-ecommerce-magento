import { useCategory } from '@entities/category';
import { Header } from '@widgets/header';
import { CategoryProductsGrid } from '@widgets/category';
import { Spinner } from '@shared/ui';

export function CategoryPage({ urlPath }) {
  const filter = { 'url_path': { 'eq': urlPath } }
  const { category, loading, error } = useCategory({ filter });

  return (
    <>
      <title>Category</title>

      {loading && (
        <Spinner />
      )}
      {error && (
        <p>{error.message}</p>
      )}
      {!loading && !error && (
        <>
          <CategoryProductsGrid category={category} />
        </>
      )}
    </>
  )
}
