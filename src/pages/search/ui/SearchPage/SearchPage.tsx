import { useSearchParams } from 'react-router';
import { SearchIcon } from 'lucide-react';
import { Container, SidebarLayout } from '@shared/ui';
import { CategoryProductListing } from '@widgets/category';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');

  if (!searchQuery) {
    return (
      <>
        <title>Search</title>

        <Container className='grid justify-items-center gap-2 py-16 text-center'>
          <SearchIcon
            aria-hidden='true'
            className='size-10 text-muted-foreground'
          />
          <h1>Search</h1>
          <p className='text-muted-foreground'>
            Enter a search term to find products.
          </p>
        </Container>
      </>
    );
  }

  const criteria = { search: searchQuery };

  return (
    <>
      <title>Search results</title>

      <Container className='py-6'>
        <h1>Search results for '{searchQuery}'</h1>
      </Container>

      <Container className='pb-10'>
        <SidebarLayout
          sidebar={<div />}
          content={<CategoryProductListing criteria={criteria} />}
        />
      </Container>
    </>
  );
}
