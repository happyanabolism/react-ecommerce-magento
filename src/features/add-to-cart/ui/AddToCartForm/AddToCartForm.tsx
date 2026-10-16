import { useState, type SubmitEvent } from 'react';
import {
  getMissingOptionCodes,
  ProductOptions,
  useProductSelection,
} from '@entities/product';
import type { AddToCartProductFragment } from '@shared/api';
import { AddToCartButton } from '../AddToCartButton/AddToCartButton';

interface AddToCartFormProps {
  product: AddToCartProductFragment;
  selection: ReturnType<typeof useProductSelection>;
}

export const AddToCartForm = ({ product, selection }: AddToCartFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    options,
    optionSelection,
    handleOptionSelect,
    isOptionValueDisabled,
    getOptionValueImage,
  } = selection;

  const missingCodes = getMissingOptionCodes(options, optionSelection);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(options, optionSelection);
    setSubmitted(true);
    if (missingCodes.length > 0) return;
    console.log({
      sku: product.sku,
      selectedOptions: optionSelection,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <AddToCartButton />
    </form>
  );
};
