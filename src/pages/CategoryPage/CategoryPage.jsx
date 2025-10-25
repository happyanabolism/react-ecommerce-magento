import { useLocation } from "react-router";
import Header from "@widgets/Header/Header";
import CategoryProductsGrid from "@features/Category/ui/CategoryProductsGrid";

function CategoryPage() {
  const location = useLocation();
  const urlPath = location.pathname.replace('/category/', '');

  return (
    <>
      <title>Category</title>
      <Header />
      <main>
        <CategoryProductsGrid urlPath={urlPath} columns={4} />
      </main>
    </>
  )
}

export default CategoryPage;