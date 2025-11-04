import { createBrowserRouter } from 'react-router';
import { HomePage } from '@pages/home';
import { CartPage } from '@pages/cart';
import { LoginPage } from '@pages/login';
import { DynamicPage } from '@pages/dynamic';
import { ROUTES } from '@shared/constants';
import { ProtectedRoute } from './ProtectedRoute';
import { GuestRoute } from './GuestRoute';

export const router = createBrowserRouter([
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
    path: ROUTES.DYNAMIC,
    element: <DynamicPage />
  }
]);
