import type { ConfigurableProductOptionsFragment } from '@shared/api';
import type { OptionSelection } from './types';
import { getAttributeCodes } from './getPrecedingSelection';

export const getMissingOptionCodes = (
  options: ConfigurableProductOptionsFragment[],
  selection: OptionSelection
) => {
  return getAttributeCodes(options).filter((code) => !selection[code]);
};
