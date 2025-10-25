import { Routes, Route, BrowserRouter } from "react-router";
import HomePage from "@pages/HomePage/HomePage";
import CategoryPage from "@pages/CategoryPage/CategoryPage";
import CartPage from "@pages/CartPage/CartPage";
import LoginPage from "@pages/LoginPage/LoginPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="/category/*" element={<CategoryPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;