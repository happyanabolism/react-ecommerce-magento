import type {
  ConfigurableProductOptionsFragment,
  ProductVariantFragment,
} from '@shared/api';
import type { OptionSelection } from './types';
import { isValueDisabled } from './isValueDisabled';
import { getAttributeCodes, getPrecedingSelection } from './getPrecedingSelection';

// pick a value and drop the values of the following attributes that don't exist with it
export const selectOptionValue = (
  options: ConfigurableProductOptionsFragment[],
  variants: Array<ProductVariantFragment | null>,
  selection: OptionSelection,
  code: string,
  uid: string
): OptionSelection => {
  const nextSelection: OptionSelection = { ...selection, [code]: uid };
  const attributeCodes = getAttributeCodes(options);
  const followingCodes = attributeCodes.slice(attributeCodes.indexOf(code) + 1);

  for (const followingCode of followingCodes) {
    const followingUid = nextSelection[followingCode];
    if (
      followingUid &&
      isValueDisabled(
        variants,
        getPrecedingSelection(options, nextSelection, followingCode),
        followingCode,
        followingUid
      )
    ) {
      delete nextSelection[followingCode];
    }
  }

  return nextSelection;
};
