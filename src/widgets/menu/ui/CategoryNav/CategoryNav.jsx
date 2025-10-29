import { useContext } from 'react';
import { CategoryList } from '@entities/category';
import { StoreContext } from '@entities/store';
import { useCategoryNav } from '@widgets/menu';
import { Spinner } from '@shared/ui';

export function CategoryNav() {
  const storeConfig = useContext(StoreContext);
  const { categories, loading, error } = useCategoryNav({ rootCategoryId: storeConfig?.root_category_id });

  if (error) return <p>{error.message}</p>;

  return (
    <nav>
      {loading && <Spinner />}
      {categories && (
        <CategoryList categories={categories} />
      )}
    </nav>
  );
}
