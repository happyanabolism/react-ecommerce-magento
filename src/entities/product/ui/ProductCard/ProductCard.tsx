import { Link } from 'react-router';
import { ProductImage } from '../ProductImage/ProductImage';
import type { ProductCardFieldsFragment } from '@shared/api';
import { ProductPrice } from '../ProductPrice/ProductPrice';

export function ProductCard({
  product,
}: {
  product: ProductCardFieldsFragment;
}) {
  // TODO: price, stock status, actions (add to cart feature)
  return (
    <div className='flex flex-col gap-3 rounded-lg border border-graphite-200 p-4'>
      <ProductImage
        className='w-full'
        url={product.small_image?.url}
        alt={product.name}
      />
      <div className='flex flex-col gap-1'>
        <Link
          to={'/' + product.url_key}
          className='font-semibold hover:underline'
        >
          {product.name}
        </Link>
        <ProductPrice priceRange={product.price_range} />
      </div>
    </div>
  );
}
