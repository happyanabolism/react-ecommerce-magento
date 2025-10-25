import ProductList from '@features/Product/ui/ProductList';
import Header from '@widgets/Header/Header';
import ProductGrid from '@features/Product/ui/ProductGrid';
import CategoryList from '@features/Category/ui/CategoryList';

function HomePage() {
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

export default HomePage;
