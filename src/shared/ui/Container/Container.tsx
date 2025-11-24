import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children, ...rest }: ContainerProps) => {
  return (
    <div className={clsx(styles.container, className)} {...rest}>
      {children}
    </div>
  );
};
