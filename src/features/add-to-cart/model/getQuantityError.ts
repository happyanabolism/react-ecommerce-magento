export const getQuantityError = (
  value: number,
  min: number,
  max: number | null
) => {
  if (!Number.isInteger(value)) return 'Please enter a valid number.';
  if (value < min) return `The minimum quantity is ${min}.`;
  if (max != null && value > max) return `The maximum quantity is ${max}.`;
  return undefined;
};
