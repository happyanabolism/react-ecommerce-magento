import clsx from 'clsx';
import styles from './Alert.module.scss';

export const Alert = ({ children, className, type = "default"}) => {
  return (
    <div
      className={clsx(
        styles.alert,
        className,
        styles[`type_${type}`]
      )}
    >
      {children}
    </div>
  )
}
