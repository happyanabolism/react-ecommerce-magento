import type { ProductImageFragment } from '@shared/api';

/** attribute_code of an option → uid of its selected value */
export type OptionSelection = Record<string, string>;

/** the customer picked value `uid` in option `code` */
export type OptionSelectHandler = (code: string, uid: string) => void;

/** can't value `uid` of option `code` be picked right now? */
export type OptionDisabledCheck = (code: string, uid: string) => boolean;

/** image to show on the swatch of value `uid` of option `code`, if any */
export type OptionValueImageGetter = (
  code: string,
  uid: string
) => ProductImageFragment | null;
