import { useParams } from "react-router";
import Header from "../../widgets/Header/Header";

function CategoryPage() {
  const { urlKey } = useParams();

  return (
    <>
      <title>Category</title>
      <Header />
      <main>
        Category
        {urlKey}
      </main>
    </>
  )
}

export default CategoryPage;