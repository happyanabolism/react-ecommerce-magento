import { createBrowserRouter } from 'react-router';
import { AccountLayout, MainLayout } from '@app/layouts';
import { ROUTES } from '@shared/constants';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';
import { PageLoader } from '@shared/ui';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      {
        path: ROUTES.HOME,
        lazy: async () => {
          const { HomePage } = await import('@pages/home');
          return { Component: HomePage };
        },
        index: true,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: ROUTES.LOGIN,
            lazy: async () => {
              const { LoginPage } = await import('@pages/login');
              return { Component: LoginPage };
            },
          },

          {
            path: ROUTES.REGISTRATION,
            lazy: async () => {
              const { RegistrationPage } = await import('@pages/registration');
              return { Component: RegistrationPage };
            },
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: ROUTES.CART,
            lazy: async () => {
              const { CartPage } = await import('@pages/cart');
              return { Component: CartPage };
            },
          },

          {
            path: ROUTES.ACCOUNT,
            element: <AccountLayout />,
            children: [
              {
                path: ROUTES.ACCOUNT_DASHBOARD,
                lazy: async () => {
                  const { AccountDashboardPage } =
                    await import('@pages/customer');
                  return { Component: AccountDashboardPage };
                },
              },
            ],
          },
        ],
      },
      {
        path: ROUTES.DYNAMIC,
        lazy: async () => {
          const { MagentoRoute } = await import('./MagentoRoute');
          return { Component: MagentoRoute };
        },
      },
    ],
  },
]);
