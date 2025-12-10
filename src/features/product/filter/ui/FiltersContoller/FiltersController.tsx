import { FilterGroup } from '@entities/product';
import type { Aggregation } from '@entities/product/model/types';

interface FiltersControllerProps {
  aggregations: Aggregation[];
}

export const FiltersController = ({ aggregations }: FiltersControllerProps) => {
  return (
    <div>
      {aggregations.map((aggregation) => (
        <FilterGroup
          aggregation={aggregation}
          key={aggregation.attribute_code}
        />
      ))}
    </div>
  );
};
