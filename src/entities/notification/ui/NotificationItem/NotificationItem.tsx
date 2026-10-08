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

const alertVariant = {
  success: 'success',
  error: 'destructive',
  info: 'default',
} as const;

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <Alert
      variant={alertVariant[notification.type]}
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
