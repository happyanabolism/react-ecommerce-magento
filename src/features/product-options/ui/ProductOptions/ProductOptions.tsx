import type { ConfigurableProductOptionsFragment } from '@shared/api';
import { ProductOption } from '../ProductOption/ProductOption';
import type {
  OptionDisabledCheck,
  OptionSelection,
  OptionSelectHandler,
  OptionValueImageGetter,
} from '../../model/types';

interface ProductOptionsProps {
  options: ConfigurableProductOptionsFragment[];
  selected: OptionSelection;
  onSelect: OptionSelectHandler;
  isDisabled: OptionDisabledCheck;
  getValueImage: OptionValueImageGetter;
}

export const ProductOptions = ({
  options,
  selected,
  onSelect,
  isDisabled,
  getValueImage,
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
          getValueImage={getValueImage}
        />
      ))}
    </>
  );
};
