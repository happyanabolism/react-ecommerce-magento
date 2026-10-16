import type { ProductVariantFragment } from '@shared/api';
import type { OptionSelection } from './types';
import { variantHasAttribute } from './variantHasAttribute';

export const isValueDisabled = (
  variants: Array<ProductVariantFragment | null>,
  selection: OptionSelection,
  code: string,
  uid: string
): boolean => {
  const combination = { ...selection, [code]: uid };

  const exists = variants.some(
    (variant) =>
      variant !== null &&
      Object.entries(combination).every(([selectedCode, selectedUid]) =>
        variantHasAttribute(variant, selectedCode, selectedUid)
      )
  );

  return !exists;
};
