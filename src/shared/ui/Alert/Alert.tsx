import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Alert.module.scss';

interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type?: 'default' | 'warning' | 'error' | 'success';
  children: ReactNode;
}

export const Alert = ({
  children,
  className,
  type = 'default',
}: AlertProps) => {
  return (
    <div
      role='alert'
      className={clsx(styles.alert, className, styles[`type_${type}`])}
    >
      {children}
    </div>
  );
};
