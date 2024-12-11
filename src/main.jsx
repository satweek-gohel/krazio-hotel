import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Comman/Navbar.jsx';
import BranchPage from './pages/BranchPage.jsx';
import { CartProvider } from './contexts/CartContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckoutPage from './components/Checkout/CheckoutPage.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { BranchProvider } from './contexts/BranchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BranchProvider>
    <CartProvider>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path='/branch-menu/:restaurantId/:branchId' element={<BranchPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          
          
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </BranchProvider>
    </AuthProvider>
  </StrictMode>
);