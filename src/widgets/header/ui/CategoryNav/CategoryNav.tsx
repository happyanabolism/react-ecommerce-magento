import { CategoryLink, useCategoryMenu } from '@entities/category';
import { Container, Spinner } from '@shared/ui';

export function CategoryNav({ limit }: { limit?: number }) {
  const { data: categories, isPending, error } = useCategoryMenu();

  if (error) return <p>{error.message}</p>;
  if (isPending) return <Spinner className='size-5 text-muted-foreground' />;

  return (
    <nav className='hidden bg-purple-200 py-2.5 text-sm font-medium text-graphite-800 md:block'>
      <Container>
        <ul className='flex flex-wrap gap-x-5 gap-y-2'>
          {categories.slice(0, limit).map((category) => (
            <li key={category.uid}>
              <CategoryLink category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
