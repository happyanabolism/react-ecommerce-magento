import { ProductsContext } from '@entities/product';
import { Spinner } from '@shared/ui';
import { useContext } from 'react';

export const ProductFilters = () => {
  const context = useContext(ProductsContext);
  if (!context || context?.loading) {
    return <Spinner />;
  }

  const { aggregations } = context;

  return (
    <ul>
      {aggregations.map((aggregation) => (
        <li key={aggregation.attribute_code}>{aggregation.label}</li>
      ))}
    </ul>
  );
};
