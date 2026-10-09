import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from '@widgets/header';
import { Toaster } from '@shared/ui';

export const MainLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Toaster position='top-right' />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer />
    </>
  );
};
