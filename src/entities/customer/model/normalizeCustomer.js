export const normalizeCustomer = (customer) => {
  const { custom_attributes } = customer;

  if (!custom_attributes || Object.keys(custom_attributes).length === 0) {
    return customer;
  }

  const normalized = custom_attributes.reduce((acc, attr) => {
    acc[attr.code] = attr.value;
    return acc;
  }, {});

  return { ...customer, custom_attributes: normalized };
};
