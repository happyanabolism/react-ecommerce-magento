import { useContext } from 'react';
import { CategoryProductsContext } from '@features/category';

export const CategoryProductFilters = () => {
  const { aggregations, error } = useContext(CategoryProductsContext);

  if (error) return null;

  return (
    <ul>
      {aggregations.map((aggregation) => (
        <li key={aggregation.attribute_code}>{aggregation.label}</li>
      ))}
    </ul>
  );
};
