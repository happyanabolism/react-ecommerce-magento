import { useCategory } from '@entities/category';
import { Header } from '@widgets/header';
import { CategoryProductsGrid, ChildCategoriesList } from '@widgets/category';

export function CategoryPage({ urlPath }) {
  const filter = { 'url_path': { 'eq': urlPath } }
  const { category, loading, error } = useCategory({ filter });

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
            <CategoryProductsGrid categoryUid={category.uid} columns={4} />
          </>
        )}
      </main>
    </>
  )
}
