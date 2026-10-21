import { ProductCard } from '@entities/product';
import { useWishlistPage } from '../../model/useWishlistPage';
import { Alert, AlertDescription, Spinner } from '@shared/ui';

export const WishlistPage = () => {
  const { data: wishlist, isPending, error } = useWishlistPage();

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

  return (
    <>
      <title>Wishlist</title>

      {wishlist.items.length === 0 ? (
        <p>You don't have items in your wishlist</p>
      ) : (
        <div className='grid grid-cols-2 gap-4 transition-opacity md:grid-cols-3 lg:grid-cols-4'>
          {wishlist.items.map((item) => {
            return item.product ? (
              <ProductCard key={item.id} product={item.product} />
            ) : null;
          })}
        </div>
      )}
    </>
  );
};
