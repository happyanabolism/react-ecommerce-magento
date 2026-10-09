import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from '@widgets/header';
import { NotificationList } from '@entities/notification';

export const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Header />
      <NotificationList />
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
};
