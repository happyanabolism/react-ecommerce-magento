import type { ID } from '.';

export type AttributeValueInterface = AttributeValue | AttributeSelectedOptions;

export type AttributeValue = {
  code: ID;
  value: string;
};

export type FlatAttributes = Record<string, string | string[]>;

export type AttributeSelectedOptions = {
  code: ID;
  selected_options: AttributeSelectedOptionInterface[];
};

export type AttributeSelectedOptionInterface = AttributeSelectedOption;

export type AttributeSelectedOption = {
  label: string;
  value: string;
};

export type AttributeMetadataError = {
  message: string;
  type: AttributeMetadataErrorType;
};

export interface AttributeValueInput {
  attribute_code: string;
  selected_options?: AttributeInputSelectedOption[];
  value?: string;
}

export type AttributeInputSelectedOption = {
  value: string;
};

export enum AttributeMetadataErrorType {
  ENTITY_NOT_FOUND = 'ENTITY_NOT_FOUND',
  ATTRIBUTE_NOT_FOUND = 'ATTRIBUTE_NOT_FOUND',
  FILTER_NOT_FOUND = 'FILTER_NOT_FOUND',
  UNDEFINED = 'UNDEFINED',
}
