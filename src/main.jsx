import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Comman/Navbar.jsx";
import BranchPage from "./pages/BranchPage.jsx";
import { CartProvider } from "./contexts/CartContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckoutPage from "./components/Checkout/CheckoutPage.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BranchProvider } from "./contexts/BranchContext.jsx";
import Orders from "./components/Comman/Orders.jsx";
import { LogoProvider } from "./contexts/LogoContext.jsx";
import OrderPlacedPage from "./pages/OrderPlacedPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BranchProvider>
        <CartProvider>
          <BrowserRouter>
          <LogoProvider>
            <Navbar />
            <Routes>
              <Route path="/*" element={<App />} />
              <Route
                path="/branch-menu/:restaurantId/:branchId"
                element={<BranchPage />}
              />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/my-orders" element={<Orders />} />
              <Route path="/order-placed" element={<OrderPlacedPage />} />
            </Routes>
            </LogoProvider>
          </BrowserRouter>
        </CartProvider>
      </BranchProvider>
    </AuthProvider>
  </StrictMode>
);
