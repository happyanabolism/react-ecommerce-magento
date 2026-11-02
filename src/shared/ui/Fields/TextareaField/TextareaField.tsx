import { useId, type TextareaHTMLAttributes } from 'react';
import { Field, FieldError, FieldLabel } from '../../shadcn/field';
import { Textarea } from '../../shadcn/textarea';

export interface TextareaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  error?: string;
}

export const TextareaField = ({
  className,
  label,
  error,
  ...textareaProps
}: TextareaFieldProps) => {
  const generatedId = useId();
  const textareaId = textareaProps.id ?? generatedId;
  const errorId = `${textareaId}-error`;

  return (
    <Field data-invalid={!!error} className={className}>
      {label && (
        <FieldLabel htmlFor={textareaId}>
          {label}
          {textareaProps.required && (
            <span className='text-destructive' aria-hidden='true'>
              *
            </span>
          )}
        </FieldLabel>
      )}
      <Textarea
        {...textareaProps}
        id={textareaId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </Field>
  );
};
