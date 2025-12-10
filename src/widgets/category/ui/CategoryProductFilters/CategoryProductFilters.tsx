import { useContext } from 'react';
import { CategoryProductsContext } from '@features/category';
import { FiltersController } from '@features/product';
import { Spinner } from '@shared/ui';

export const CategoryProductFilters = () => {
  const { aggregations, loading, error, setFilters } = useContext(
    CategoryProductsContext
  );

  if (loading) return <Spinner />;
  if (error) return null;

  return <FiltersController aggregations={aggregations} />;
};
