import { useContext } from 'react';
import { CategoryProductsContext } from '@features/category';
import { Spinner } from '@shared/ui';

export const CategoryProductFilters = () => {
  const { aggregations, loading, error } = useContext(CategoryProductsContext);

  // if (loading) return <Spinner />;
  if (error) return null;

  return (
    <ul>
      {aggregations.map((aggregation) => (
        <li key={aggregation.attribute_code}>{aggregation.label}</li>
      ))}
    </ul>
  );
};
