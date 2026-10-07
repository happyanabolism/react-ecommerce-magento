import clsx from 'clsx';
import type { ProductPriceRangeFragment } from '@shared/api';
import { Price } from '@shared/ui';
import styles from './ProductPrice.module.scss';

interface ProductPriceProps {
  priceRange: ProductPriceRangeFragment;
  className?: string;
}

// A configurable product's variants may cost differently: then only the
// lowest price is shown with "From" (Magento Luma shows "As low as").
export const ProductPrice = ({ priceRange, className }: ProductPriceProps) => {
  const { final_price: price, regular_price: regularPrice } =
    priceRange.minimum_price;
  const maxValue = priceRange.maximum_price?.final_price.value;

  const isRange =
    price.value != null && maxValue != null && maxValue > price.value;

  return (
    <div className={clsx(styles.productPrice, className)}>
      {isRange && <span className={styles.label}>From</span>}
      <Price price={price} oldPrice={regularPrice} />
    </div>
  );
};
