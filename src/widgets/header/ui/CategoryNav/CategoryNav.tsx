import { CategoryLink } from '@entities/category';
import { useCategoryNav } from '../../model/useCategoryNav';
import { Container, Spinner } from '@shared/ui';
import { getMagentoErrorMessage } from '@shared/api';

export function CategoryNav({ limit }: { limit?: number }) {
  const { categories, loading, error } = useCategoryNav({
    limit,
  });

  if (error) return <p>{getMagentoErrorMessage(error)}</p>;
  if (loading) return <Spinner className='size-5 text-muted-foreground' />;

  return (
    <nav className='hidden bg-purple-200 py-2.5 text-sm font-medium text-graphite-800 md:block'>
      <Container>
        <ul className='flex flex-wrap gap-x-5 gap-y-2'>
          {categories.map((category) => (
            <li key={category.uid}>
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
