import type { Aggregation } from '@entities/product/model/types';

interface ProductFiltersProps {
  aggregations: Aggregation[];
}

export const ProductFilters = ({ aggregations }: ProductFiltersProps) => {
  return (
    <ul>
      {aggregations.map((aggregation) => (
        <li key={aggregation.attribute_code}>{aggregation.label}</li>
      ))}
    </ul>
  );
};
