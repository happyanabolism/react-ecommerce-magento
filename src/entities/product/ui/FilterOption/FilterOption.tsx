import type { AggregationOption } from '@entities/product/model/types';

interface AggregationOptionProps {
  aggregationOption: AggregationOption;
  checked: boolean;
  onChange: (value: string) => void;
}

export const FilterOption = ({
  aggregationOption,
  checked,
  onChange,
}: AggregationOptionProps) => {
  return (
    <label>
      <input
        type='checkbox'
        checked={checked}
        value={aggregationOption.value}
        onChange={(e) => onChange(e.target.value)}
      />
      {aggregationOption.label}
    </label>
  );
};
