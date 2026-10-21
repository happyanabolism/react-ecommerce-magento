import { useQuery } from '@tanstack/react-query';
import { selectJwt } from '@entities/session/@x/wishlist';
import { request, type WishlistQuery } from '@shared/api';
import { useAppSelector } from '@shared/lib';
import { WISHLIST } from '../api/api';

const selectWishlist = (data: WishlistQuery) => data.customer?.wishlists?.[0];

export const useWishlist = () => {
  const jwt = useAppSelector(selectJwt);

  return useQuery({
    queryKey: ['customer', 'wishlist'],
    queryFn: () => request(WISHLIST),
    select: selectWishlist,
    enabled: !!jwt,
  });
};
