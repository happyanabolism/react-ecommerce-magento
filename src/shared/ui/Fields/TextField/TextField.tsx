import { useId, type InputHTMLAttributes } from 'react';
import { Field, FieldError, FieldLabel } from '../../shadcn/field';
import { Input } from '../../shadcn/input';

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
  const generatedId = useId();
  const inputId = inputProps.id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <Field data-invalid={!!error} className={className}>
      {label && (
        <FieldLabel htmlFor={inputId}>
          {label}
          {inputProps.required && (
            <span className='text-destructive' aria-hidden='true'>
              *
            </span>
          )}
        </FieldLabel>
      )}
      <Input
        {...inputProps}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      ></Input>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
};
