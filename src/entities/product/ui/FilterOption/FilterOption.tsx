import type { AggregationOption } from '@entities/product/model/types';

interface AggregationOptionProps {
  aggregationOption: AggregationOption;
  onChange: (value: string) => void;
}

export const FilterOption = ({
  aggregationOption,
  onChange,
}: AggregationOptionProps) => {
  return (
    <label>
      <input
        type='checkbox'
        value={aggregationOption.value}
        onChange={(e) => onChange(e.target.value)}
      />
      {aggregationOption.label}
    </label>
  );
};
