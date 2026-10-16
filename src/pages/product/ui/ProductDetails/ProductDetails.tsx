import {
  ProductDescription,
  ProductGallery,
  ProductPrice,
  ProductSku,
  ProductTitle,
  useProductSelection,
} from '@entities/product';
import { AddToCartForm } from '@features/add-to-cart';
import type { ProductPageProductFragment } from '@shared/api';

interface ProductDetailsProps {
  product: ProductPageProductFragment;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const selection = useProductSelection(product);
  const { variant, previewVariant } = selection;
  const shownProduct = variant?.product ?? product;
  const previewProduct = previewVariant?.product ?? product;

  return (
    <div className='grid gap-8 py-6 md:grid-cols-2 md:items-start'>
      <ProductGallery
        key={previewProduct.uid}
        mediaGallery={previewProduct.media_gallery ?? []}
      />
      <div className='flex flex-col gap-4'>
        <ProductTitle name={product.name} />
        <ProductPrice
          className='text-2xl'
          priceRange={shownProduct.price_range}
        />
        <ProductSku sku={shownProduct.sku} />
        <ProductDescription
          html={shownProduct.description?.html ?? product.description?.html}
        />
        <AddToCartForm product={product} selection={selection} />
      </div>
    </div>
  );
};
