import {
  ProductDescription,
  ProductGallery,
  ProductOptions,
  ProductPrice,
  ProductSku,
  ProductTitle,
  useProductSelection,
} from '@entities/product';
import type { ProductPageProductFragment } from '@shared/api';

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
        <ProductTitle name={product.name} />
        <ProductPrice
          className='text-2xl'
          priceRange={shownProduct.price_range}
        />
        <ProductSku sku={shownProduct.sku} />
        <ProductDescription
          html={shownProduct.description?.html ?? product.description?.html}
        />
        {/* TODO: ProductForm — ProductOptions + AddToCart */}
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
