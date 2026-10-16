import type { ProductVariantFragment } from '@shared/api';
import type { OptionSelection } from './types';
import { variantHasAttribute } from './variantHasAttribute';

// first variant that has every selected value; the selection may be partial (color picked, size not)
export const findFirstMatchingVariant = (
  variants: Array<ProductVariantFragment | null>,
  selection: OptionSelection
): ProductVariantFragment | undefined => {
  const selectedValues = Object.entries(selection);
  if (selectedValues.length === 0) return undefined;

  return (
    variants.find(
      (variant) =>
        variant !== null &&
        selectedValues.every(([code, uid]) =>
          variantHasAttribute(variant, code, uid)
        )
    ) ?? undefined
  );
};
