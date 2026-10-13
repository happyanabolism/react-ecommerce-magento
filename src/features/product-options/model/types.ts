/** attribute_code of an option → uid of its selected value */
export type OptionSelection = Record<string, string>;

/** the customer picked value `uid` in option `code` */
export type OptionSelectHandler = (code: string, uid: string) => void;
