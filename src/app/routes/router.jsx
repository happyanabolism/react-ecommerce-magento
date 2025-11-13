import { createBrowserRouter } from 'react-router';
import { AccountDashboardPage } from '@pages/customer';
import { RegistrationPage } from '@pages/registration';
import { MainLayout } from '@app/layouts';
import { HomePage } from '@pages/home';
import { CartPage } from '@pages/cart';
import { LoginPage } from '@pages/login';
import { DynamicPage } from '@pages/dynamic';
import { ROUTES } from '@shared/constants';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <HomePage />,
        index: true,
      },
      {
        path: ROUTES.CART,
        element: <ProtectedRoute><CartPage /></ProtectedRoute>,
      },
      {
        path: ROUTES.LOGIN,
        element: <GuestRoute><LoginPage /></GuestRoute>,
      },
      {
        path: ROUTES.REGISTRATION,
        element: <GuestRoute><RegistrationPage /></GuestRoute>,
      },
      {
        path: ROUTES.ACCOUNT_DASHBOARD,
        element: <ProtectedRoute><AccountDashboardPage /></ProtectedRoute>
      },
      {
        path: ROUTES.DYNAMIC,
        element: <DynamicPage />
      }
    ]
  }
]);
