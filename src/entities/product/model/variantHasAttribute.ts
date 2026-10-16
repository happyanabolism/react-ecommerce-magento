import type { ProductVariantFragment } from '@shared/api';

export const variantHasAttribute = (
  variant: ProductVariantFragment,
  code: string,
  uid: string
) =>
  (variant.attributes ?? []).some(
    (attribute) => attribute?.code === code && attribute.uid === uid
  );
