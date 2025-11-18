export const getCustomAttributeValue = (entity, attributeCode) => {
  if (!entity || !entity?.custom_attributes) return null;

  try {
    const attribute = entity.custom_attributes.find(
      (attribute) => attribute.code === attributeCode
    );

    return attribute?.value;
  } catch (err) {
    return null;
  }
};
