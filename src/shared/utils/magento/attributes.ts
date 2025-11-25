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

  const attr = attributes.find((attribute) => attribute.code === code);
  if (!attr) return null;

  if ('value' in attr) return attr.value;

  if ('selected_options' in attr)
    return attr.selected_options.map((option) => option.label);

  return null;
};

type FormAttributes = FlatAttributes;

// --- API → FORM ---
export function flatCustomAttibutes<
  T extends { custom_attributes?: AttributeValueInterface[] },
>(
  obj: T
): Omit<T, 'custom_attributes'> & { custom_attributes?: FormAttributes } {
  const { custom_attributes, ...rest } = obj;

  const mappedAttributes: FormAttributes | null = custom_attributes
    ? custom_attributes.reduce<FormAttributes>((acc, attr) => {
        if ('value' in attr) {
          acc[attr.code] = attr.value;
        } else if ('selected_options' in attr) {
          acc[attr.code] = attr.selected_options.map((option) => option.value);
        }
        return acc;
      }, {})
    : {};

  return {
    ...rest,
    custom_attributes: mappedAttributes,
  };
}

// --- FORM → API ---
export function normalizeCustomAttributes<
  T extends { custom_attributes?: FormAttributes },
>(
  obj: T
): Omit<T, 'custom_attributes'> & {
  custom_attributes: AttributeValueInput[];
} {
  const { custom_attributes, ...rest } = obj;

  const apiAttributes: AttributeValueInput[] | null = custom_attributes
    ? Object.entries(custom_attributes).map(([attribute_code, value]) => {
        if (Array.isArray(value)) {
          return {
            attribute_code,
            selected_options: value.map((v) => ({ value: v })),
          };
        } else {
          return {
            attribute_code,
            value,
          };
        }
      })
    : [];

  return {
    ...rest,
    custom_attributes: apiAttributes,
  };
}
