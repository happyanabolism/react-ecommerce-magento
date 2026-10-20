import { RecentlyViewedProducts } from '@widgets/recently-viewed-products';
import { Container } from '@shared/ui';

export function HomePage() {
  return (
    <>
      <title>Home</title>

      <Container>
        <RecentlyViewedProducts size={6} />
      </Container>
    </>
  );
}
