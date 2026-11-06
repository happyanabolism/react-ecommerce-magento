import { Link } from 'react-router';
import type { ProductCardFieldsFragment } from '@shared/api';
import { ProductImage, ProductPrice } from '@entities/product';

interface SearchResultProductsProps {
  products: ProductCardFieldsFragment[];
  onProductSelect?: () => void;
}

export const SearchResultProducts = ({
  products,
  onProductSelect,
}: SearchResultProductsProps) => {
  if (products.length === 0) return null;

  return (
    <section className='grid content-start gap-2'>
      <h3 className='text-xs font-semibold tracking-wide text-muted-foreground uppercase'>
        Products
      </h3>
      <ul className='grid gap-0.5'>
        {products.map((product) => (
          <li key={product.sku}>
            <Link
              onClick={onProductSelect}
              to={'/' + product.url_key}
              className='flex items-center gap-3 rounded-md p-1.5 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none'
            >
              <div className='grid size-12 shrink-0 place-items-center overflow-hidden rounded-md border bg-muted text-[0.5rem] text-muted-foreground'>
                <ProductImage
                  className='size-full object-cover'
                  url={product.image?.url}
                  alt={product.name}
                />
              </div>
              <div className='grid min-w-0 gap-0.5'>
                <span className='truncate text-sm'>{product.name}</span>
                <ProductPrice
                  priceRange={product.price_range}
                  className='text-sm font-semibold'
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
