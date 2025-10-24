import ProductList from '@features/Product/ui/ProductList';
import Header from '../../widgets/Header/Header';
import ProductGrid from '../../features/Product/ui/ProductGrid';

function HomePage() {
  return (
    <>
      <title>Home</title>

      <Header />
      <main>
        <ProductGrid categoryId={252} columns={5} />
      </main>
    </>
  );
}

export default HomePage;
