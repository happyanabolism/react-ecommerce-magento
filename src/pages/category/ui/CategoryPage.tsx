import { useCategory } from '@entities/category';
import { Container, Spinner } from '@shared/ui';
import { FilterableProductListing } from './FilterableProductListing';

interface CategoryPageProps {
  urlPath: string;
}

export function CategoryPage({ urlPath }: CategoryPageProps) {
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory({ filters: { url_path: { eq: urlPath } } });

  if (categoryLoading) return <Spinner />;
  // TODO: 404 page
  if (!category || categoryError) return <p>Page not found</p>;

  return (
    <>
      <title>Category</title>

      {/* Category Header Component in category/entity */}
      <Container>
        <h1>{category.name}</h1>
        <div>description</div>
      </Container>

      <Container>
        <FilterableProductListing categoryUid={category.uid} />
      </Container>
    </>
  );
}
