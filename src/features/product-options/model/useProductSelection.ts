import { useState } from 'react';
import type {
  OptionSelection,
  OptionValueImageGetter,
  OptionSelectHandler,
  OptionDisabledCheck,
} from './types';
import { findVariant } from './findVariant';
import { selectOptionValue } from './selectOptionValue';
import { isValueDisabled } from './isValueDisabled';
import { getPrecedingSelection } from './getPrecedingSelection';
import { findVariantByOptionValue } from './findVariantByOptionValue';
import type { ProductWithOptionsFragment } from '@shared/api';

export const useProductSelection = (product: ProductWithOptionsFragment) => {
  const [optionSelection, setOptionSelection] = useState<OptionSelection>({});

  const isConfigurable = product.__typename === 'ConfigurableProduct';

  const options = isConfigurable
    ? (product.configurable_options ?? [])
        .filter((option) => option !== null)
        .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    : [];
  const variants = isConfigurable ? (product.variants ?? []) : [];

  const variant = findVariant(variants, optionSelection);

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

  const getOptionValueImage: OptionValueImageGetter = (code, uid) => {
    const variant = findVariantByOptionValue(variants, code, uid);
    return variant?.product?.thumbnail ?? null;
  };

  return {
    options,
    variant,
    optionSelection,
    handleOptionSelect,
    isOptionValueDisabled,
    getOptionValueImage,
  };
};
