import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from 'cn';
import { ProductImage } from '../ProductImage/ProductImage';
import type { ProductCardFieldsFragment } from '@shared/api';
import { ProductPrice } from '../ProductPrice/ProductPrice';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@shared/ui';

interface ProductCardProps {
  product: ProductCardFieldsFragment;
  className?: string;
  /** small actions over the top corner of the image: wish list, compare, quick view */
  quickActions?: ReactNode;
}

export function ProductCard({
  product,
  className,
  quickActions,
}: ProductCardProps) {
  // TODO: stock status, actions (add to cart feature)
  return (
    <Card className={cn('relative', className)}>
      <ProductImage
        className='w-full'
        url={product.image?.url}
        alt={product.name}
      />
      {/* after the image, so the Card keeps treating the image as its first child (no top padding, rounded corners) */}
      {quickActions && (
        <div className='absolute top-2 right-2 flex flex-col gap-2'>
          {quickActions}
        </div>
      )}
      <CardHeader>
        <CardTitle>
          <Link
            to={'/' + product.url_key}
            className='font-semibold hover:underline'
          >
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className='mt-auto'>
        <ProductPrice priceRange={product.price_range} />
      </CardContent>
      <CardFooter>
        {/* TODO: actions slot */}
        <Button className='w-full'>Add to cart</Button>
      </CardFooter>
    </Card>
  );
}
