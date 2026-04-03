import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import ProductDetailPage from '../pages/ProductDetailPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category/:id" element={<CategoryPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  );
}