import { useParams } from 'react-router';
import { useCategory } from '@entities/category';
import { Header } from '@widgets/header';
import { CategoryProductsGrid, ChildCategoriesList } from '@widgets/category';
import { ROUTE_CONSTANTS } from '@shared/config';

export function CategoryPage() {
  const { uid } = useParams();

  const filter = { 'category_uid': { 'eq': uid } }
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
