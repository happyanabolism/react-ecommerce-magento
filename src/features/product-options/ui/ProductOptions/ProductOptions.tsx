import type { ConfigurableProductOptionsFragment } from '@shared/api';
import { ProductOption } from '../ProductOption/ProductOption';
import type {
  OptionDisabledCheck,
  OptionSelection,
  OptionSelectHandler,
} from '../../model/types';

interface ProductOptionsProps {
  options: ConfigurableProductOptionsFragment[];
  selected: OptionSelection;
  onSelect: OptionSelectHandler;
  isDisabled: OptionDisabledCheck;
}

export const ProductOptions = ({
  options,
  selected,
  onSelect,
  isDisabled,
}: ProductOptionsProps) => {
  return (
    <>
      {options.map((option) => (
        <ProductOption
          key={option.uid}
          option={option}
          selected={selected}
          onSelect={onSelect}
          isDisabled={isDisabled}
        />
      ))}
    </>
  );
};
