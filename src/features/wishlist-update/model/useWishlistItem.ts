import { useQuery } from '@tanstack/react-query';
import { selectJwt } from '@entities/session';
import { WISHLIST } from '@entities/wishlist';
import { request, type WishlistQuery } from '@shared/api';
import { useAppSelector } from '@shared/lib';

// the wish list item of this product, or null — a slice of the shared wishlist query,
// so a button re-renders only when its own item changes.
// With variantSku: only the item of that variant; without: any item of the product
// (a configurable item keeps the parent in `product` and the chosen child in `configured_variant`)
const selectWishlistItem = (
  data: WishlistQuery,
  sku: string,
  variantSku?: string
) =>
  data.customer?.wishlists?.[0]?.items_v2?.items.find((item) => {
    if (item?.product?.sku !== sku) return false;
    if (!variantSku) return true;
    return (
      item.__typename === 'ConfigurableWishlistItem' &&
      item.configured_variant?.sku === variantSku
    );
  }) ?? null;

export const useWishlistItem = (sku: string, variantSku?: string) => {
  const jwt = useAppSelector(selectJwt);

  return useQuery({
    queryKey: ['customer', 'wishlist'],
    queryFn: () => request(WISHLIST),
    select: (data) => selectWishlistItem(data, sku, variantSku),
    enabled: !!jwt,
  });
};
