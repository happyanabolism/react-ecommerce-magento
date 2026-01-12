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

  const handleChange = (attributeCode: string, value: string): void => {
    setFilters({
      filter: {
        [attributeCode]: [value],
      },
    });
  };

  return (
    <FiltersController aggregations={aggregations} onChange={handleChange} />
  );
};
