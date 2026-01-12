import { FilterGroup } from '@entities/product';
import type {
  Aggregation,
  AggregationOption,
} from '@entities/product/model/types';

interface FiltersControllerProps {
  aggregations: Aggregation[];
  onChange: (attributeCode: string, value: string) => void;
}

export const FiltersController = ({
  aggregations,
  onChange,
}: FiltersControllerProps) => {
  return (
    <div>
      {aggregations.map((aggregation) => (
        <FilterGroup
          aggregation={aggregation}
          key={aggregation.attribute_code}
          onChange={onChange}
        />
      ))}
    </div>
  );
};
