import { CategorySidebarLayout } from '@pages/category';
import { CategoryProductsProvider } from '@features/category';
import { Container } from '@shared/ui';
import {
  CategoryProductListing,
  CategoryProductFilters,
} from '@widgets/category';
import type { CategoryPageFieldsFragment } from '@shared/api/gql/graphql';

export function CategoryPage({
  category,
}: {
  category: CategoryPageFieldsFragment;
}) {
  return (
    <>
      <title>{category.name}</title>

      {/* Category Header Component in category/entity */}
      <Container>
        <h1>{category.name}</h1>
        <div>description</div>
      </Container>

      <Container>
        <CategoryProductsProvider categoryUid={category.uid}>
          <CategorySidebarLayout
            sidebar={<CategoryProductFilters />}
            content={<CategoryProductListing />}
          />
        </CategoryProductsProvider>
      </Container>
    </>
  );
}
