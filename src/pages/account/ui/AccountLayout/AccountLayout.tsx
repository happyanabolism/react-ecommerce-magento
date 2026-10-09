import { Outlet } from 'react-router';
import { Container, SidebarLayout } from '@shared/ui';
import { AccountNavigation } from '../AccountNavigation/AccountNavigation';

export const AccountLayout = () => {
  return (
    <Container className='py-6'>
      <SidebarLayout sidebar={<AccountNavigation />} content={<Outlet />} />
    </Container>
  );
};
