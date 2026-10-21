import { useQuery } from '@tanstack/react-query';
import { request, type WishlistPageQuery } from '@shared/api';
import { WISHLIST_PAGE } from '../api/api';

const selectWishlistPage = (data: WishlistPageQuery) => {
  const wishlist = data.customer?.wishlists?.[0];
  return {
    id: wishlist?.id ?? null,
    items: (wishlist?.items_v2?.items ?? []).filter((item) => item != null),
  };
};

export const useWishlistPage = () => {
  return useQuery({
    queryKey: ['customer', 'wishlist', 'page'],
    queryFn: () => request(WISHLIST_PAGE),
    select: selectWishlistPage,
  });
};
