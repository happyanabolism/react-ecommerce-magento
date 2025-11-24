import { useCategory } from '@entities/category';
import { CategoryProductsGrid } from '@widgets/category';
import { Container, Spinner } from '@shared/ui';

interface CategoryPageProps {
  urlPath: string;
}

export function CategoryPage({ urlPath }: CategoryPageProps) {
  const filters = { url_path: { eq: urlPath } };
  const { category, loading, error } = useCategory({ filters });

  return (
    <>
      <title>Category</title>

      <Container>
        {loading && <Spinner />}
        {error && <p>{error.message}</p>}
        {category && (
          <>
            <CategoryProductsGrid categoryUid={category.uid} />
          </>
        )}
      </Container>
    </>
  );
}
