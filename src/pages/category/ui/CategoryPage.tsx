import { CategorySidebarLayout } from '@pages/category';
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
  const criteria = { filter: { category_uid: { eq: category.uid } } };

  return (
    <>
      <title>{category.name}</title>

      {/* Category Header Component in category/entity */}
      <Container>
        <h1>{category.name}</h1>
        <div>description</div>
      </Container>

      <Container>
        <CategorySidebarLayout
          sidebar={<CategoryProductFilters criteria={criteria} />}
          content={<CategoryProductListing criteria={criteria} />}
        />
      </Container>
    </>
  );
}
