import type { ConfigurableProductOptionsFragment } from '@shared/api';
import { ProductOption } from '../ProductOption/ProductOption';
import type { OptionSelection, OptionSelectHandler } from '../../model/types';

interface ProductOptionsProps {
  options: Array<ConfigurableProductOptionsFragment | null>;
  selected: OptionSelection;
  onSelect: OptionSelectHandler;
}

export const ProductOptions = ({
  options,
  selected,
  onSelect,
}: ProductOptionsProps) => {
  return (
    <>
      {options
        .filter((option) => option !== null)
        .map((option) => (
          <ProductOption
            key={option.uid}
            option={option}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
    </>
  );
};
