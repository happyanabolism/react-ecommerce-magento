import styles from "./DropdownMenuItem.module.scss";

export const DropdownMenuItem = ({ children, ...rest }) => {
  return (
    <li className={styles.dropdownItem} {...rest}>
      { children }
    </li>
  )
}
