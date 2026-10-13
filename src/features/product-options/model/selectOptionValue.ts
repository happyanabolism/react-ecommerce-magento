import type {
  ConfigurableProductOptionsFragment,
  ProductVariantFragment,
} from '@shared/api';
import type { OptionSelection } from './types';
import { isValueDisabled } from './isValueDisabled';
import { getOptionCodes, selectionBefore } from './selectionBefore';

// pick a value and drop the values of the following options that don't exist with it
export const selectOptionValue = (
  options: Array<ConfigurableProductOptionsFragment | null>,
  variants: Array<ProductVariantFragment | null>,
  selection: OptionSelection,
  code: string,
  uid: string
): OptionSelection => {
  const next: OptionSelection = { ...selection, [code]: uid };
  const codes = getOptionCodes(options);

  for (const nextCode of codes.slice(codes.indexOf(code) + 1)) {
    const nextUid = next[nextCode];
    if (
      nextUid &&
      isValueDisabled(
        variants,
        selectionBefore(options, next, nextCode),
        nextCode,
        nextUid
      )
    ) {
      delete next[nextCode];
    }
  }

  return next;
};
