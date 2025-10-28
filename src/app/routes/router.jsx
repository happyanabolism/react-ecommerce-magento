import { createBrowserRouter } from 'react-router';
import { HomePage } from '@pages/home';
import { CartPage } from '@pages/cart';
import { SignInPage } from '@pages/sign-in';
import { DynamicPage } from '@pages/dynamic';
import { ROUTES } from '@shared/constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    index: true,
  },
  {
    path: ROUTES.CART,
    element: <CartPage />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
  {
    path: ROUTES.DYNAMIC,
    element: <DynamicPage />
  }
]);
