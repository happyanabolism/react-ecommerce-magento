import { useState, type InputHTMLAttributes } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BaseField } from '../BaseField/BaseField';
import styles from './PasswordField.module.scss';

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  error?: string;
}

export const PasswordField = ({
  label,
  error,
  className,
  ...inputProps
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <BaseField label={label} error={error}>
      {(id) => (
        <div className={styles.passwordField}>
          <input
            {...inputProps}
            id={id}
            aria-invalid={!!error}
            type={visible ? 'text' : 'password'}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
          />
          <span
            className={styles.passwordFieldIcon}
            onClick={() => setVisible((prev) => !prev)}
          >
            {visible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
      )}
    </BaseField>
  );
};
