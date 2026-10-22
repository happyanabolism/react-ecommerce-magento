import { useOptimistic, useTransition, type ComponentProps } from 'react';
import { HeartIcon } from 'lucide-react';
import { cn } from 'cn';
import { useWishlistId } from '@entities/wishlist';
import { Button } from '@shared/ui';
import { useWishlistItem } from '../../model/useWishlistItem';
import { useAddToWishlist } from '../../model/useAddToWishlist';
import { useRemoveFromWishlist } from '../../model/useRemoveFromWishlist';

interface AddToWishlistButtonProps extends Omit<
  ComponentProps<typeof Button>,
  'onClick'
> {
  sku: string;
  /** the chosen variant of a configurable product: the heart shows and removes that variant */
  variantSku?: string;
  options?: string[];
}

export const AddToWishlistButton = ({
  sku,
  variantSku,
  options,
  className,
  children,
  ...props
}: AddToWishlistButtonProps) => {
  // icon only (cards) or icon + visible text (product page: «Add to Wish List»)
  const hasLabel = children != null;

  const [isUpdating, startTransition] = useTransition();
  const { data: wishlistId = null } = useWishlistId();
  const { data: wishlistItem = null } = useWishlistItem(sku, variantSku);
  const isInWishlist = wishlistItem !== null;
  const { mutateAsync: addToWishlist } = useAddToWishlist();
  const { mutateAsync: removeFromWishlist } = useRemoveFromWishlist();
  const [optimisticIsInWishlist, setOptimisticIsInWishlist] =
    useOptimistic(isInWishlist);

  const handleUpdateWishlistItem = () => {
    if (!wishlistId) return;
    startTransition(async () => {
      setOptimisticIsInWishlist(!isInWishlist);
      try {
        if (isInWishlist) {
          await removeFromWishlist({
            wishlistId,
            wishlistItemsIds: [wishlistItem.id],
          });
        } else {
          await addToWishlist({
            wishlistId,
            wishlistItems: [
              {
                sku,
                selected_options: options,
                quantity: 1,
              },
            ],
          });
        }
      } catch {}
    });
  };

  return (
    <Button
      type='button'
      variant='outline'
      size={hasLabel ? 'default' : 'icon-sm'}
      aria-pressed={optimisticIsInWishlist}
      // a visible text is the accessible name itself; only the icon-only button needs a label
      aria-label={hasLabel ? undefined : 'Add to wish list'}
      title={hasLabel ? undefined : 'Add to wish list'}
      className={cn(
        // colour only the heart: with a text label the text stays as it is
        'hover:[&_svg]:text-destructive',
        !hasLabel && 'rounded-full bg-background/90',
        'aria-pressed:[&_svg]:text-destructive aria-pressed:[&_svg]:fill-current',
        className
      )}
      disabled={isUpdating}
      onClick={() => handleUpdateWishlistItem()}
      {...props}
    >
      <HeartIcon aria-hidden='true' />
      {children}
    </Button>
  );
};
