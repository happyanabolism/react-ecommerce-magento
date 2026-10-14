import type { ConfigurableProductOptionsFragment } from '@shared/api';
import type { OptionSelection } from './types';

export const getAttributeCodes = (
  options: ConfigurableProductOptionsFragment[]
) =>
  options
    .map((option) => option.attribute_code)
    .filter((attributeCode) => attributeCode != null);

// selection of the attributes that come before `code` (Magento order: color, then size)
export const getPrecedingSelection = (
  options: ConfigurableProductOptionsFragment[],
  selection: OptionSelection,
  code: string
): OptionSelection => {
  const attributeCodes = getAttributeCodes(options);
  const precedingCodes = attributeCodes.slice(
    0,
    Math.max(attributeCodes.indexOf(code), 0)
  );

  const precedingSelection: OptionSelection = {};
  for (const precedingCode of precedingCodes) {
    const uid = selection[precedingCode];
    if (uid) precedingSelection[precedingCode] = uid;
  }
  return precedingSelection;
};
