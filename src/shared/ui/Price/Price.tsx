import { cn } from 'cn';
import type { MoneyFragment } from '@shared/api';
import { formatPrice } from '@shared/lib';

interface PriceProps {
  price: MoneyFragment;
  // previous price, shown struck through when it is higher than `price`
  oldPrice?: MoneyFragment | null;
  className?: string;
}

// assumes `price` and `oldPrice` are in the same currency
export const Price = ({ price, oldPrice, className }: PriceProps) => {
  const { value, currency } = price;
  if (value == null || currency == null) return null;

  const oldValue = oldPrice?.value;
  const hasOldPrice = oldValue != null && oldValue > value;

  return (
    <span className={cn('inline-flex items-baseline gap-2', className)}>
      <span className='font-semibold'>{formatPrice(value, currency)}</span>
      {hasOldPrice && (
        <s className='text-[0.875em] text-muted-foreground'>{formatPrice(oldValue, currency)}</s>
      )}
    </span>
  );
};
