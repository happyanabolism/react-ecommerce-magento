import { useContext } from 'react';
import { CategoryList } from '@entities/category';
import { StoreContext } from '@entities/store';
import { useCategoryNav } from '@widgets/menu';

export function CategoryNav() {
  const storeConfig = useContext(StoreContext);
  const { categories, loading, error } = useCategoryNav({ rootCategoryId: storeConfig?.root_category_id });

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <nav>
      {categories && (
        <CategoryList categories={categories} />
      )}
    </nav>
  );
}
