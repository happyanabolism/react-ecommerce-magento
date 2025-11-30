import { useCategory } from '@entities/category';
import { CategoryProductsGrid } from '@widgets/category';
import { Alert, Container, Spinner } from '@shared/ui';
import { useProducts } from '@entities/product';

interface CategoryPageProps {
  urlPath: string;
}

export function CategoryPage({ urlPath }: CategoryPageProps) {
  const {
    category,
    loading: categoryLoading,
    error: categoryError,
  } = useCategory({ filters: { url_path: { eq: urlPath } } });

  const {
    items: producst,
    page_info,
    loading: productsLoading,
    error: productsError,
    fetchMore: fetchMoreProducts,
  } = useProducts({
    filter: { category_uid: { eq: category?.uid } },
    skip: !category?.uid,
  });

  if (categoryLoading) return <Spinner />;
  // TODO: 404 page
  if (!category || categoryError) return <p>Page not found</p>;

  return (
    <>
      <title>Category</title>

      <div>category image/banner</div>
      <Container>
        <h1>{category.name}</h1>
        <div>description</div>
      </Container>

      {/* тут нужны продукты */}
      <Container>
        <div className='sidebar'>
          {/* 'тут будет компонент фильтов, в который нужно передать продукты */}
          {productsLoading ? (
            <Spinner /> // только для фильтров
          ) : productsError ? (
            <Alert>{productsError.message}</Alert>
          ) : (
            <div>product filters</div>
          )}
        </div>
        <div className='product listing'>
          {/* 'тут будет компонент сортировки, в который нужно передать возможные сортировки из категории */}
          <div>products sorting</div>

          {/* этот компонент внутри содержит вывод продуктов + пагинацию + логику получения текущей страницы и получения продуктов
          для текущей страницы, я собираюсь расформировать этот компонент
          логику получения страницы из урла перенести в CategoryPage компонент, пагинацию вывести ниже, а тут оставить толкьо компонент
          который выводит сетку продуктов, которые сюда  */}
          {category && <CategoryProductsGrid categoryUid={category.uid} />}

          {/* 'тут будет компонент пагинации, в который нужно передать pageInfo и хэндлер */}
          <div>products pagination</div>
        </div>
      </Container>
    </>
  );
}
