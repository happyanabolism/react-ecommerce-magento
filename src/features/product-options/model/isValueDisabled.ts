import type { ProductVariantFragment } from '@shared/api';
import type { OptionSelection } from './types';

const hasAttribute = (
  variant: ProductVariantFragment,
  code: string,
  uid: string
) =>
  (variant.attributes ?? []).some(
    (attribute) => attribute?.code === code && attribute.uid === uid
  );

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
        hasAttribute(variant, selectedCode, selectedUid)
      )
  );

  return !exists;
};
