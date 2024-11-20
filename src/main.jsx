import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Comman/Navbar.jsx'
import BranchPage from './pages/BranchPage.jsx'
// Import Slick Carousel CSS files
import "slick-carousel/slick/slick.css"; // Core Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Slick theme CSS (optional for styling)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
   <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App/>} />
        <Route path='/branch-menu' element={<BranchPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
