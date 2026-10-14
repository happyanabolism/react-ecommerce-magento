import type { ProductVariantFragment } from '@shared/api';
import { variantHasAttribute } from './variantHasAttribute';

export const findVariantByOptionValue = (
  variants: Array<ProductVariantFragment | null>,
  code: string,
  uid: string
): ProductVariantFragment | null => {
  return (
    variants
      .filter((vatiant) => vatiant != null)
      .find((variant) => variantHasAttribute(variant, code, uid)) ?? null
  );
};
