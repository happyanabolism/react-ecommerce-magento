import type { ConfigurableProductOptionsFragment } from '@shared/api';
import { ProductOption } from '../ProductOption/ProductOption';

interface ProductOptionsProps {
  options: Array<ConfigurableProductOptionsFragment | null>;
}

export const ProductOptions = ({ options }: ProductOptionsProps) => {
  return (
    <>
      {options
        .filter((option) => option !== null)
        .map((option) => (
          <ProductOption key={option.uid} option={option} />
        ))}
    </>
  );
};
