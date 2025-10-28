import { createBrowserRouter } from 'react-router';
import { HomePage } from '@pages/home';
import { CategoryPage } from '@pages/category';
import { CartPage } from '@pages/cart';
import { SignInPage } from '@pages/sign-in';
import { ROUTES } from '@shared/constants';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    index: true,
  },
  {
    path: ROUTES.CATEGORY,
    element: <CategoryPage />,
  },
  {
    path: ROUTES.CART,
    element: <CartPage />,
  },
  {
    path: ROUTES.SIGN_IN,
    element: <SignInPage />,
  },
]);
