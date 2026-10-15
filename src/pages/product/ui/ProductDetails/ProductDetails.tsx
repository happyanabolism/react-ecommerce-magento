import { ProductGallery, ProductImage, ProductPrice } from '@entities/product';
import { ProductOptions, useProductSelection } from '@features/product-options';
import type { ProductPageProductFragment } from '@shared/api';
import { RichContent } from '@shared/ui';

interface ProductDetailsProps {
  product: ProductPageProductFragment;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const {
    variant,
    previewVariant,
    options,
    optionSelection,
    handleOptionSelect,
    isOptionValueDisabled,
    getOptionValueImage,
  } = useProductSelection(product);
  const shownProduct = variant?.product ?? product;
  const previewProduct = previewVariant?.product ?? product;

  return (
    <div className='grid gap-8 py-6 md:grid-cols-2 md:items-start'>
      <ProductGallery
        key={previewProduct.uid}
        mediaGallery={previewProduct.media_gallery ?? []}
      />
      <div className='flex flex-col gap-4'>
        <h1>{product.name}</h1>
        <span className='text-sm text-muted-foreground'>
          SKU: {shownProduct.sku}
        </span>
        <ProductPrice
          className='text-2xl'
          priceRange={shownProduct.price_range}
        />
        <RichContent
          html={shownProduct.description?.html ?? product.description?.html}
        />
        {options.length > 0 && (
          <ProductOptions
            options={options}
            selected={optionSelection}
            onSelect={handleOptionSelect}
            isDisabled={isOptionValueDisabled}
            getValueImage={getOptionValueImage}
          />
        )}
      </div>
    </div>
  );
};
