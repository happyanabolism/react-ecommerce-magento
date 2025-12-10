import { FilterOption, type Aggregation } from '@entities/product';
import styles from './FilterGroup.module.scss';

interface FilterGroupProps {
  aggregation: Aggregation;
}

export const FilterGroup = ({ aggregation }: FilterGroupProps) => {
  return (
    <div>
      {aggregation.label && <strong>{aggregation.label}</strong>}
      <ul className={styles.filterGroup}>
        {aggregation.options.map((option) => (
          <li key={option.value}>
            <FilterOption
              aggregationOption={option}
              checked={true}
              onChange={(aggregationValue) => console.log(aggregationValue)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
