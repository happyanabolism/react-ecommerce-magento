import { Header } from '@widgets/header';
import { CategoryNav } from '@widgets/menu';

export function HomePage() {
  return (
    <>
      <title>Home</title>

      <Header />
      <CategoryNav />
      <main>
        HomePage
      </main>
    </>
  );
}
