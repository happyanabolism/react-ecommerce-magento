import { CategorySidebarLayout } from '@pages/category';
import { CategoryProductsProvider } from '@features/category';
import { useCategory } from '@entities/category';
import { Container, Spinner } from '@shared/ui';
import {
  CategoryProductListing,
  CategoryProductFilters,
} from '@widgets/category';

interface CategoryPageProps {
  urlPath: string;
}

export function CategoryPage({ urlPath }: CategoryPageProps) {
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory({ filters: { url_path: { eq: urlPath } } });

  return (
    <>
      <title>Category</title>

      {/* Category Header Component in category/entity */}
      <Container>
        {categoryLoading ? (
          <Spinner />
        ) : !category || categoryError ? (
          <p>Page not found</p>
        ) : (
          <>
            <h1>{category.name}</h1>
            <div>description</div>
          </>
        )}
      </Container>

      <Container>
        <CategoryProductsProvider categoryUid={category?.uid}>
          <CategorySidebarLayout
            sidebar={<CategoryProductFilters />}
            content={<CategoryProductListing />}
          />
        </CategoryProductsProvider>
      </Container>
    </>
  );
}
