import { IMaskInput, type ReactMaskProps } from 'react-imask';
import { BaseField } from '../BaseField/BaseField';

interface TelephoneFieldProps
  extends Omit<ReactMaskProps<HTMLInputElement>, 'onAccept'> {
  className?: string;
  label?: string;
  error?: string;
  mask: string;
  value: string;
  onChange: (value: string) => void;
}

export const TelephoneField = ({
  className,
  label,
  error,
  mask,
  value,
  onChange,
  ...inputProps
}: TelephoneFieldProps) => {
  return (
    <BaseField label={label} error={error} className={className}>
      {(id) => (
        <IMaskInput
          mask={mask}
          value={value}
          onAccept={onChange}
          id={id}
          {...inputProps}
        />
      )}
    </BaseField>
  );
};
