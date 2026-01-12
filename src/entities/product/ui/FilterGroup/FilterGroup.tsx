import {
  FilterOption,
  type Aggregation,
  type AggregationOption,
} from '@entities/product';
import styles from './FilterGroup.module.scss';

interface FilterGroupProps {
  aggregation: Aggregation;
  onChange: (attributeCode: string, value: string) => void;
}

export const FilterGroup = ({ aggregation, onChange }: FilterGroupProps) => {
  return (
    <div>
      {aggregation.label && <strong>{aggregation.label}</strong>}
      <ul className={styles.filterGroup}>
        {aggregation.options.map((option) => (
          <li key={option.value}>
            <FilterOption
              aggregationOption={option}
              onChange={(value) => onChange(aggregation.attribute_code, value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
