import { forwardRef } from "react";
import styles from "./Input.module.scss"

export const Input = forwardRef(({ ...inputProps }, ref) => {
  return (
    <input
      ref={ref}
      className={styles.input}
      {...inputProps}
    />
  )
})
