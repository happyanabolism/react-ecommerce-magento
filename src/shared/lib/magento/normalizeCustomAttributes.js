export const normalizeCustomAttributes = (entity) => {
  const { custom_attributes } = entity;

  if (!custom_attributes || Object.keys(custom_attributes).length === 0) {
    return entity;
  }

  const normalizedCustomAttributes = Object.entries(custom_attributes).map(
    (attribute) => {
      const [attribute_code, value] = attribute;
      return { attribute_code, value };
    }
  );

  return { ...entity, custom_attributes: normalizedCustomAttributes };
};
