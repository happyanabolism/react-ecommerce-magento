import {
  ProductDescription,
  ProductGallery,
  ProductPrice,
  ProductSku,
  ProductTitle,
  useProductSelection,
} from '@entities/product';
import { AddToCartForm } from '@features/add-to-cart';
import { AddToWishlistButton } from '@features/wishlist-update';
import type { ProductPageProductFragment } from '@shared/api';
import { Rating } from '@shared/ui';
import { REVIEWS_ANCHOR } from '../../config/anchors';

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
        {product.review_count > 0 && (
          <a
            href={`#${REVIEWS_ANCHOR}`}
            className='flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline'
          >
            Reviews ({product.review_count})
            <Rating value={product.rating_summary} />
          </a>
        )}
        <ProductPrice
          className='text-2xl'
          priceRange={shownProduct.price_range}
        />
        <ProductSku sku={shownProduct.sku} />
        <ProductDescription
          html={shownProduct.description?.html ?? product.description?.html}
        />
        <AddToCartForm
          product={product}
          selection={selection}
          actions={
            product.sku ? (
              <AddToWishlistButton
                sku={product.sku}
                variantSku={variant?.product?.sku ?? undefined}
                options={
                  variant ? Object.values(selection.optionSelection) : undefined
                }
              >
                Add to wishlist
              </AddToWishlistButton>
            ) : null
          }
        />
      </div>
    </div>
  );
};
