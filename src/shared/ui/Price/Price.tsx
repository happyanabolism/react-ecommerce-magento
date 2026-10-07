import clsx from 'clsx';
import type { MoneyFragment } from '@shared/api';
import { formatPrice } from '@shared/lib';
import styles from './Price.module.scss';

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
    <span className={clsx(styles.price, className)}>
      <span className={styles.current}>{formatPrice(value, currency)}</span>
      {hasOldPrice && (
        <s className={styles.old}>{formatPrice(oldValue, currency)}</s>
      )}
    </span>
  );
};
