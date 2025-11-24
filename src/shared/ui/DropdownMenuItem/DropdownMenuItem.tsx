import type { HTMLAttributes, ReactNode } from 'react';
import styles from './DropdownMenuItem.module.scss';

interface DropdownMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

export const DropdownMenuItem = ({
  children,
  ...rest
}: DropdownMenuItemProps) => {
  return (
    <li className={styles.dropdownItem} {...rest}>
      {children}
    </li>
  );
};
