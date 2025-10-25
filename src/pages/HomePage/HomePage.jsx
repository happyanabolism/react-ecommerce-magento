import ProductList from '@features/Product/ui/ProductList';
import Header from '../../widgets/Header/Header';
import ProductGrid from '../../features/Product/ui/ProductGrid';
import CategoryList from '../../features/Category/ui/CategoryList';

function HomePage() {
  return (
    <>
      <title>Home</title>

      <Header />
      <main>
        <CategoryList />
        <br />
        <CategoryList parentCategoryId={245} />
        <ProductGrid categoryId={252} columns={5} />
      </main>
    </>
  );
}

export default HomePage;
