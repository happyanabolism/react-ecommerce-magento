import { CategorySidebarLayout } from '@pages/category';
import { ProductListing } from '@widgets/product';
import { ProductFilters, ProductsProvider } from '@features/product';
import { useCategory } from '@entities/category';
import { Container, Spinner } from '@shared/ui';

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
        {category && (
          <ProductsProvider categoryUid={category.uid}>
            <CategorySidebarLayout
              sidebar={[<ProductFilters key='filters' />]}
              content={[<ProductListing key='listing' />]}
            />
          </ProductsProvider>
        )}
      </Container>
    </>
  );
}
