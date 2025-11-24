import { useId } from 'react';
import clsx from 'clsx';
import type { FieldControlType } from '../types';
import styles from './BaseField.module.scss';

interface BaseFieldProps {
  className?: string;
  label?: string;
  error?: string;
  children: FieldControlType;
}

export const BaseField = ({
  className,
  label,
  error,
  children,
}: BaseFieldProps) => {
  const id = useId();

  return (
    <div className={clsx(styles.formField, className)}>
      {label && <label htmlFor={id}>{label}</label>}
      {children(id)}
      {error && <small className={styles.fieldError}>{error}</small>}
    </div>
  );
};
