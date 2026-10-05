import {
  removeNotification,
  type Notification,
} from '../../model/notificationSlice';
import styles from './NotificationItem.module.scss';
import { Alert } from '@shared/ui';
import { useAppDispatch } from '@shared/lib';

interface NotificationItemProps {
  notification: Notification;
}

const alertType = {
  success: 'success',
  error: 'error',
  info: 'default',
} as const;

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <Alert
      type={alertType[notification.type]}
      role={notification.type === 'error' ? 'alert' : 'status'}
      className={styles.notification}
    >
      <span className={styles.message}>{notification.message}</span>
      <button
        type='button'
        className={styles.close}
        aria-label='Close'
        onClick={() => dispatch(removeNotification(notification.id))}
      >
        x
      </button>
    </Alert>
  );
};
