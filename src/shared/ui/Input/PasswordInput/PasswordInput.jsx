import { useState, useId } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import clsx from "clsx";
import { Input } from "@shared/ui";
import styles from "./PasswordInput.module.scss"

export const PasswordInput = ({
  label,
  className,
  error,
  ...rest
}) => {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div className={clsx(styles.passwordField, className)}>
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <div className={styles.inputWrapper}>
        <Input
          type={visible ? 'text' : 'password'}
          id={id}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        />
        <span className={styles.passwordFieldIcon} onClick={() => setVisible((prev) => !prev)}>
          {visible ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {error && (
        <small className={styles.fieldError}>{error.message}</small>
      )}
    </div>
  )
}
