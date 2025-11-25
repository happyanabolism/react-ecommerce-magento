export enum FilterMatchTypeEnum {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
}

export interface FilterMatchTypeInput {
  match?: string;
  match_type?: FilterMatchTypeEnum;
}

export interface FilterEqualTypeInput {
  eq?: string;
  in?: string[];
}

export interface FilterRangeTypeInput {
  from?: string;
  to?: string;
}
