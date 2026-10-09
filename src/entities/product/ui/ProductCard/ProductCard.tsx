import { Link } from 'react-router';
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

export function ProductCard({
  product,
}: {
  product: ProductCardFieldsFragment;
}) {
  // TODO: stock status, actions (add to cart feature)
  return (
    <Card>
      <ProductImage
        className='w-full'
        url={product.image?.url}
        alt={product.name}
      />
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
