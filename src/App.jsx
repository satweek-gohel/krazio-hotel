import React from 'react'
import CenterFocusSlider from './components/Slider'
import './index.css';
import CardList from './components/CardList';
import PromotionalSlider from './components/Base/BasePromotionSlider';
function App() {
  const images = [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-1.jpg',
    '/hero-2.jpg'
  ];
  return (
    <div>
     <CenterFocusSlider />
     <CardList />
    
    
    </div>
  )
}

export default App