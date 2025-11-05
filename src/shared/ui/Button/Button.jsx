import clsx from "clsx"
import styles from "./Button.module.scss"

export const Button = ({
  children,
  variant = "secondary",
  loading = false,
  disabled = false,
  className,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        styles.button,
        styles[`variant_${variant}`],
        {[styles.loading]: loading},
        className
      )}
      disabled={isDisabled}
      {...rest}
    >

      {loading && (
        <span className={styles.iconWrapper}>
          <span className={styles.loader} />
        </span>
      )}
      <span>{children}</span>
    </button>
  )
}
