import { TextField, type TextFieldProps } from '../TextField/TextField';

export const QuantityField = (props: TextFieldProps) => {
  return <TextField type='number' inputMode='numeric' step={1} {...props} />;
};
