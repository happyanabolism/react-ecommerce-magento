import { useState } from 'react';
import { ProductImage, ProductPrice } from '@entities/product';
import {
  ProductOptions,
  type OptionSelection,
  type OptionSelectHandler,
  type OptionDisabledCheck,
  findVariant,
  isValueDisabled,
  getPrecedingSelection,
  selectOptionValue,
} from '@features/product-options';
import { useProductPage } from '../../model/useProductPage';
import {
  Alert,
  AlertDescription,
  Container,
  RichContent,
  Spinner,
} from '@shared/ui';
interface ProductPageProps {
  sku: string;
}

export const ProductPage = ({ sku }: ProductPageProps) => {
  const [optionSelection, setOptionSelection] = useState<OptionSelection>({});
  const { product, isPending, error } = useProductPage({ sku });

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
  if (!product)
    return (
      <Alert variant='destructive'>
        <AlertDescription>Product not found</AlertDescription>
      </Alert>
    );

  const isConfigurable = product.__typename === 'ConfigurableProduct';
  // Magento GraphQL doesn't sort configurable options; position sets their order and precedence
  const options = isConfigurable
    ? (product.configurable_options ?? [])
        .filter((option) => option !== null)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    : [];
  const variants = isConfigurable ? (product.variants ?? []) : [];

  const variant = findVariant(variants, optionSelection);
  const shown = variant?.product ?? product;

  const handleOptionSelect: OptionSelectHandler = (code, uid) => {
    if (!uid) return;
    setOptionSelection((selection) =>
      selectOptionValue(options, variants, selection, code, uid)
    );
  };

  const isOptionValueDisabled: OptionDisabledCheck = (code, uid) =>
    isValueDisabled(
      variants,
      getPrecedingSelection(options, optionSelection, code),
      code,
      uid
    );

  return (
    <>
      <title>{product.name}</title>
      <Container>
        <div className='grid gap-8 py-6 md:grid-cols-2 md:items-start'>
          <ProductImage
            className='w-full rounded-xl bg-graphite-100'
            url={shown.image?.url}
            alt={shown.name}
          />
          <div className='flex flex-col gap-4'>
            <h1>{product.name}</h1>
            <span className='text-sm text-muted-foreground'>
              SKU: {shown.sku}
            </span>
            <ProductPrice className='text-2xl' priceRange={shown.price_range} />
            <RichContent
              html={shown.description?.html ?? product.description?.html}
            />
            {options.length > 0 && (
              <ProductOptions
                options={options}
                selected={optionSelection}
                onSelect={handleOptionSelect}
                isDisabled={isOptionValueDisabled}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
