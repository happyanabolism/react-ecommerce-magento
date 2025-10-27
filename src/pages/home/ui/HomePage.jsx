import { Header } from '@widgets/header';
import { CategoryList } from '@widgets/category/ui';

export function HomePage() {
  return (
    <>
      <title>Home</title>

      <Header />
      <main>
        <CategoryList />
        <br />
        <CategoryList parentCategoryId={245} />
      </main>
    </>
  );
}
