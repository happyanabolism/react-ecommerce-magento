import type {
  AttributeValueInput,
  CustomAttributeFieldsFragment,
} from '../gql/graphql';

// form-friendly shape of custom attributes: { code: value }
export type FlatAttributes = Record<string, string | string[]>;

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
  customAttributes: (CustomAttributeFieldsFragment | null)[] | null | undefined
): FlatAttributes => {
  if (!customAttributes) return {};

  return customAttributes.reduce((acc: FlatAttributes, attribute) => {
    if (!attribute) return acc;

    if ('value' in attribute) {
      acc[attribute.code] = attribute.value;
    }

    if ('selected_options' in attribute) {
      acc[attribute.code] = attribute.selected_options
        .filter((option) => option !== null)
        .map((option) => option.label);
    }

    return acc;
  }, {});
};
