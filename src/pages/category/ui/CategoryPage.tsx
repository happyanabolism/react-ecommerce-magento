import { Container, SidebarLayout } from '@shared/ui';
import {
  CategoryProductListing,
  CategoryProductFilters,
} from '@widgets/category';
import type { CategoryPageFieldsFragment } from '@shared/api';

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
      <Container className='py-6'>
        <h1>{category.name}</h1>
        <div>description</div>
      </Container>

      <Container className='pb-10'>
        <SidebarLayout
          sidebar={<CategoryProductFilters criteria={criteria} />}
          content={<CategoryProductListing criteria={criteria} />}
        />
      </Container>
    </>
  );
}
