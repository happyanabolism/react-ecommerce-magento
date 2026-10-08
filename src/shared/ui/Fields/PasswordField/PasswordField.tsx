import { useState, useId, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Field, FieldError, FieldLabel } from '../../shadcn/field';
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '../../shadcn/input-group';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

export const PasswordField = ({
  label,
  error,
  className,
  ...inputProps
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

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
      <InputGroup>
        <InputGroupInput
          {...inputProps}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          type={visible ? 'text' : 'password'}
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
        />
        <InputGroupAddon align='inline-end'>
          <InputGroupButton
            type='button'
            size='icon-xs'
            aria-label={visible ? 'Hide password' : 'Show password'}
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? <EyeOff /> : <Eye />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
};
