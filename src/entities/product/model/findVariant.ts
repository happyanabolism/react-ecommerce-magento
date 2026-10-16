import type { ProductVariantFragment } from '@shared/api';
import type { OptionSelection } from './types';

export const findVariant = (
  variants: Array<ProductVariantFragment | null>,
  selection: OptionSelection
): ProductVariantFragment | undefined =>
  variants.find(
    (variant) =>
      variant !== null &&
      (variant.attributes ?? []).every(
        (attribute) =>
          attribute !== null &&
          attribute.code !== null &&
          selection[attribute.code] === attribute.uid
      )
  ) ?? undefined;
