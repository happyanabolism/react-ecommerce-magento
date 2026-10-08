import { useId, type ComponentProps } from 'react';
import { IMaskMixin } from 'react-imask';
import { Field, FieldError, FieldLabel } from '../../shadcn/field';
import { Input } from '../../shadcn/input';

interface TelephoneFieldProps extends Omit<
  ComponentProps<'input'>,
  'value' | 'onChange' | 'defaultValue' | 'ref'
> {
  className?: string;
  label?: string;
  error?: string;
  mask: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const MaskedInput = IMaskMixin<HTMLInputElement>(({ inputRef, ...props }) => (
  <Input ref={inputRef} {...props} />
));

export const TelephoneField = ({
  className,
  label,
  error,
  mask,
  value,
  onChange,
  ...inputProps
}: TelephoneFieldProps) => {
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
      <MaskedInput
        {...inputProps}
        mask={mask}
        value={value}
        onAccept={(maskedValue: string) => onChange(maskedValue)}
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
};
