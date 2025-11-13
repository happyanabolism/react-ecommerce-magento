import { useId } from "react"
import clsx from "clsx";
import { Input } from "@shared/ui";
import styles from "./FormInput.module.scss"

export const FormInput = ({
  label,
  className,
  type,
  error,
  ...rest
}) => {
  const id = useId();

  return (
    <div className={clsx(styles.formField, className)}>
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <Input
        type={type}
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      />
      {error && (
        <small className={styles.fieldError}>{error.message}</small>
      )}
    </div>
  )
}
