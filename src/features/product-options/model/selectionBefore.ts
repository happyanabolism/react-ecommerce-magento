import type { ConfigurableProductOptionsFragment } from '@shared/api';
import type { OptionSelection } from './types';

export const getOptionCodes = (
  options: Array<ConfigurableProductOptionsFragment | null>
) =>
  options
    .map((option) => option?.attribute_code)
    .filter((code) => code != null);

// selection of the options that come before `code` (Magento order: color, then size)
export const selectionBefore = (
  options: Array<ConfigurableProductOptionsFragment | null>,
  selection: OptionSelection,
  code: string
): OptionSelection => {
  const codes = getOptionCodes(options);
  const previousCodes = codes.slice(0, Math.max(codes.indexOf(code), 0));

  const previous: OptionSelection = {};
  for (const previousCode of previousCodes) {
    const uid = selection[previousCode];
    if (uid) previous[previousCode] = uid;
  }
  return previous;
};
