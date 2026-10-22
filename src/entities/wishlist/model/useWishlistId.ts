import { useQuery } from '@tanstack/react-query';
import { selectJwt } from '@entities/session/@x/wishlist';
import { request, type WishlistQuery } from '@shared/api';
import { useAppSelector } from '@shared/lib';
import { WISHLIST } from '../api/api';

// only the id of the shared wishlist query: a string does not change when items are added
// or removed, so components that need just the id don't re-render on every like
const selectWishlistId = (data: WishlistQuery) =>
  data.customer?.wishlists?.[0]?.id ?? null;

export const useWishlistId = () => {
  const jwt = useAppSelector(selectJwt);

  return useQuery({
    queryKey: ['customer', 'wishlist'],
    queryFn: () => request(WISHLIST),
    select: selectWishlistId,
    enabled: !!jwt,
  });
};
