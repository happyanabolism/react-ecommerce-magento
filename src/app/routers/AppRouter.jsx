import { Routes, Route, BrowserRouter } from 'react-router';
import { HomePage } from '@pages/home';
import { CategoryPage } from '@pages/category';
import { CartPage } from '@pages/cart';
import { SignInPage } from '@pages/sign-in';
import { ROUTE_CONSTANTS } from '@shared/config';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path={ROUTE_CONSTANTS.HOME} element={<HomePage />} />
        <Route path={ROUTE_CONSTANTS.CART} element={<CartPage />} />
        <Route path={ROUTE_CONSTANTS.CATEGORY_VIEW} element={<CategoryPage />} />
        <Route path={ROUTE_CONSTANTS.SIGN_IN} element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}