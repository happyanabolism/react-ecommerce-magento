import type {
  AttributeValueInterface,
  AttributeValueInput,
  FlatAttributes,
} from '@shared/types';

export const getAttributeValue = (
  attributes: AttributeValueInterface[] | null,
  code: string
): string | string[] | null => {
  if (!attributes) return null;

  const attribute = attributes.find((attribute) => attribute.code === code);
  if (!attribute) return null;

  if ('value' in attribute) return attribute.value;

  if ('selected_options' in attribute)
    return attribute.selected_options.map((option) => option.label);

  return null;
};

export const normalizeCustomAttributes = (
  customAttributes: FlatAttributes | undefined
): AttributeValueInput[] => {
  if (!customAttributes) return [];

  return Object.entries(customAttributes).map(([code, value]) => ({
    attribute_code: code,
    value: Array.isArray(value) ? undefined : value,
    selected_options: Array.isArray(value)
      ? value.map((v) => ({
          value: v,
        }))
      : undefined,
  }));
};

export const flatCustomAttributes = (
  customAttributes: AttributeValueInterface[] | undefined
): FlatAttributes => {
  if (!customAttributes) return {};

  return customAttributes.reduce((acc: FlatAttributes, attribute) => {
    if ('value' in attribute) {
      acc[attribute.code] = attribute.value;
    }

    if ('selected_options' in attribute) {
      acc[attribute.code] = attribute.selected_options.map(
        (option) => option.label
      );
    }

    return acc;
  }, {});
};
