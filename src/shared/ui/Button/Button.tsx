import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'secondary' | 'primary' | 'link';
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export const Button = ({
  children,
  variant = 'secondary',
  loading = false,
  disabled = false,
  className,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <button
      className={clsx(
        styles.button,
        styles[`variant_${variant}`],
        loading && styles.loading,
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
  );
};
