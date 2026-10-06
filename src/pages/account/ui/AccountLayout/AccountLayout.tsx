import { Outlet } from 'react-router';
import { Container } from '@shared/ui';
import { AccountNavigation } from '../AccountNavigation/AccountNavigation';
import styles from './AccountLayout.module.scss';

export const AccountLayout = () => {
  return (
    <Container className={styles.accountLayout}>
      <aside className={styles.accountAside}>
        <AccountNavigation />
      </aside>
      <div className={styles.accountSection}>
        <Outlet />
      </div>
    </Container>
  );
};
