import { Routes, Route } from 'react-router';
import HomePage from '@pages/HomePage/HomePage';
import CartPage from '@pages/CartPage/CartPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
