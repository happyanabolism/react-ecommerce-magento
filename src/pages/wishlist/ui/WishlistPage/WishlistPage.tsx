import { startTransition, useOptimistic } from 'react';
import { ProductCard } from '@entities/product';
import {
  RemoveFromWishlistButton,
  useRemoveFromWishlist,
} from '@features/wishlist-update';
import { Alert, AlertDescription, Spinner } from '@shared/ui';
import { useWishlistPage } from '../../model/useWishlistPage';

export const WishlistPage = () => {
  const { data: wishlist, isPending, error } = useWishlistPage();
  const { mutateAsync: removeFromWishlist } = useRemoveFromWishlist();
  const [optimisticItems, removeOptimistic] = useOptimistic(
    wishlist?.items ?? [],
    (current, itemIds: string[]) =>
      current.filter((item) => !itemIds.includes(item.id))
  );

  if (isPending)
    return (
      <Spinner className='mx-auto my-8 block size-8 text-muted-foreground' />
    );

  if (error)
    return (
      <Alert variant='destructive'>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );

  if (!wishlist || optimisticItems.length === 0)
    return <p>You don't have items in your wishlist</p>;

  const handleRemoveWishlist = (wishlistItemsIds: string[]) => {
    startTransition(async () => {
      removeOptimistic(wishlistItemsIds);
      try {
        await removeFromWishlist({
          wishlistId: wishlist.id,
          wishlistItemsIds,
        });
      } catch {}
    });
  };

  return (
    <>
      <title>Wishlist</title>
      <div className='grid grid-cols-2 gap-4 transition-opacity md:grid-cols-3 lg:grid-cols-4'>
        {optimisticItems.map((item) => {
          if (!item.product) return null;
          const selectedOptions =
            item.__typename === 'ConfigurableWishlistItem'
              ? (item.configurable_options ?? []).filter(
                  (option) => option != null
                )
              : [];

          return (
            <ProductCard
              key={item.id}
              product={item.product}
              quickActions={
                <RemoveFromWishlistButton
                  onClick={() => handleRemoveWishlist([item.id])}
                />
              }
              details={
                selectedOptions.length > 0 ? (
                  <dl className='text-sm text-muted-foreground'>
                    {selectedOptions.map((option) => (
                      <div
                        key={option.configurable_product_option_uid}
                        className='flex gap-1'
                      >
                        <dt>{option.option_label}:</dt>
                        <dd>{option.value_label}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null
              }
            />
          );
        })}
      </div>
    </>
  );
};
