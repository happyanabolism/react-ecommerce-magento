import { Header } from '@widgets/header';
import { ChildCategoriesList } from '@widgets/category';
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
