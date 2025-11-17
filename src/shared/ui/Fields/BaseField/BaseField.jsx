import { useId } from "react"
import clsx from "clsx";
import styles from "./BaseField.module.scss"

export const BaseField = ({
  label,
  error,
  className,
  children
}) => {
  const id = useId();

  clsx
  return (
    <div className={clsx(styles.formField, className)}>
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      {children(id)}
      {error && (
        <small className={styles.fieldError}>{error}</small>
      )}
    </div>
  )
}
