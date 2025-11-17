import { Input } from "@shared/ui";
import { BaseField } from "../BaseField/BaseField";

export const TextField = ({
  label,
  error,
  className,
  ...inputProps
}) => {
  return (
    <BaseField label={label} error={error} className={className}>
      {(id) => (
        <Input
          {...inputProps}
          id={id}
          aria-invalid={!!error}
        />
      )}
    </BaseField>
  )
}
