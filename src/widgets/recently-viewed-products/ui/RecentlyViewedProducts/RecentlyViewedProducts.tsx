import type { CSSProperties } from 'react';
import { cn } from 'cn';
import { useSelector } from 'react-redux';
import { ProductCard } from '@entities/product';
import {
  Alert,
  AlertDescription,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Spinner,
} from '@shared/ui';
import { useRecentlyViewedProducts } from '../../model/useRecentlyViewedProducts';
import { selectRecentlyViewedSkus } from '../../model/selectors';
import { AddToWishlistButton } from '@features/wishlist-update';

interface RecentlyViewedProductsProps {
  className?: string;
  size?: number;
  exclude?: string[];
}

export const RecentlyViewedProducts = ({
  className,
  size = 4,
  exclude = [],
}: RecentlyViewedProductsProps) => {
  const viewedSkus = useSelector(selectRecentlyViewedSkus);
  const shownSkus = viewedSkus.filter((sku) => !exclude.includes(sku));
  const { data: products, isPending, error } = useRecentlyViewedProducts();

  if (shownSkus.length === 0) return null;
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
    <section
      aria-labelledby='recently-viewed-title'
      className={cn('flex flex-col gap-4 py-6', className)}
      style={{ '--slide-basis': `${100 / size}%` } as CSSProperties}
    >
      <h2 id='recently-viewed-title' className='text-xl font-semibold'>
        Recently viewed
      </h2>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {shownSkus.map((sku) => {
            const product = products.find((product) => product.sku === sku);
            return product ? (
              <CarouselItem
                key={product.uid}
                className='basis-1/2 sm:basis-1/3 lg:basis-(--slide-basis)'
              >
                <ProductCard
                  className='h-full'
                  product={product}
                  quickActions={
                    product.sku ? (
                      <AddToWishlistButton sku={product.sku} />
                    ) : null
                  }
                />
              </CarouselItem>
            ) : null;
          })}
        </CarouselContent>
        <CarouselPrevious className='left-2 hidden md:inline-flex md:disabled:hidden' />
        <CarouselNext className='right-2 hidden md:inline-flex md:disabled:hidden' />
      </Carousel>
    </section>
  );
};
