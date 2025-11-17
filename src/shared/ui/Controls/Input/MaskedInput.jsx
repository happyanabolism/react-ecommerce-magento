import { IMaskInput } from "react-imask";
import styles from './Input.module.scss';

export const MaskedInput = ({ mask, value, onChange, ...inputProps }) => {
  return (
    <IMaskInput
      mask={mask}
      className={styles.input}
      value={value}
      onAccept={onChange}
      {...inputProps}
    />
  )
}
