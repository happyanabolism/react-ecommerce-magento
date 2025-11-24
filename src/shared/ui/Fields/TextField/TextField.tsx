import { BaseField } from '../BaseField/BaseField';
import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

export const TextField = ({
  className,
  label,
  error,
  ...inputProps
}: TextFieldProps) => {
  return (
    <BaseField className={className} label={label} error={error}>
      {(id) => <input {...inputProps} id={id} aria-invalid={!!error} />}
    </BaseField>
  );
};
