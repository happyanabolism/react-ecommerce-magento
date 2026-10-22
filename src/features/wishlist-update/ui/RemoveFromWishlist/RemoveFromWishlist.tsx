import type { ComponentProps } from 'react';
import { Trash2Icon } from 'lucide-react';
import { cn } from 'cn';
import { Button } from '@shared/ui';

type RemoveFromWishlistProps = ComponentProps<typeof Button>;

export const RemoveFromWishlist = ({
  className,
  ...props
}: RemoveFromWishlistProps) => {
  return (
    <Button
      type='button'
      variant='outline'
      size='icon-sm'
      aria-label='Remove from wish list'
      title='Remove from wish list'
      className={cn(
        'rounded-full bg-background/90 hover:text-destructive',
        className
      )}
      {...props}
    >
      <Trash2Icon aria-hidden='true' />
    </Button>
  );
};
