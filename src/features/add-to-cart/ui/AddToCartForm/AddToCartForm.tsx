import { useState, type ReactNode, type SubmitEvent } from 'react';
import {
  getMissingOptionCodes,
  ProductOptions,
  useProductSelection,
} from '@entities/product';
import type { AddToCartProductFragment } from '@shared/api';
import { QuantityField } from '@shared/ui';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';
import { getQuantityError } from '../../model/getQuantityError';

interface AddToCartFormProps {
  product: AddToCartProductFragment;
  selection: ReturnType<typeof useProductSelection>;
  /** next to the add to cart button: wish list, compare */
  actions?: ReactNode;
}

export const AddToCartForm = ({
  product,
  selection,
  actions,
}: AddToCartFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const minQuantity = product.min_sale_qty ?? 1;
  const maxQuantity = product.max_sale_qty;
  const [quantity, setQuantity] = useState(minQuantity);
  const {
    options,
    optionSelection,
    handleOptionSelect,
    isOptionValueDisabled,
    getOptionValueImage,
  } = selection;

  const missingCodes = getMissingOptionCodes(options, optionSelection);
  const quantityError = getQuantityError(quantity, minQuantity, maxQuantity);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (missingCodes.length > 0 || quantityError) return;
    console.log({
      quantity: quantity,
      sku: product.sku,
      selectedOptions: Object.values(optionSelection),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {options.length > 0 && (
        <ProductOptions
          options={options}
          selected={optionSelection}
          onSelect={handleOptionSelect}
          isDisabled={isOptionValueDisabled}
          getValueImage={getOptionValueImage}
          missingCodes={submitted ? missingCodes : []}
        />
      )}
      <QuantityField
        label='Qty'
        value={Number.isNaN(quantity) ? '' : quantity}
        min={minQuantity}
        max={maxQuantity ?? undefined}
        onChange={(event) => setQuantity(event.target.valueAsNumber)}
        error={submitted ? quantityError : undefined}
      />
      <div className='flex flex-wrap gap-2'>
        <AddToCartButton />
        {actions}
      </div>
    </form>
  );
};
