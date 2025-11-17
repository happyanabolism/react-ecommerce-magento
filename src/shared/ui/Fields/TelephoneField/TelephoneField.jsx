import { MaskedInput } from "@shared/ui";
import { BaseField } from "../BaseField/BaseField";

export const TelephoneField = ({
  mask,
  label,
  error,
  className,
  ...inputProps
}) => {
  return (
    <BaseField label={label} error={error} className={className}>
      {(id) => (
        <MaskedInput
          mask={mask}
          id={id}
          aria-invalid={!!error}
          {...inputProps}
        />
      )}
    </BaseField>
  )
}
