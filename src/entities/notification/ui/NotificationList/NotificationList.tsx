import { createPortal } from 'react-dom';
import { useAppSelector } from '@shared/lib';
import { selectNotifications } from '../../model/selectors';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import styles from './NotificationList.module.scss';

export const NotificationList = () => {
  const notifications = useAppSelector(selectNotifications);

  if (!notifications.length) return null;

  return createPortal(
    <ul className={styles.list}>
      {notifications.map((notification) => (
        <li key={notification.id}>
          <NotificationItem notification={notification} />
        </li>
      ))}
    </ul>,
    document.body
  );
};
