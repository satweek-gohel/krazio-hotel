import React from 'react';
import MenuCard from '../Base/BaseMenuCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MenuSlider = ({ items, onAddToCart, disabled, title = "Top picks menu for easy online food delivery" }) => {
  const scrollRef = React.useRef(null);
  
  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No items available</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-10 mx-auto px-4 py-3">
      {/* Header with title and navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-left text-black">{title}</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Slider container */}
      <div className="relative overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map(item => (
            <div 
              key={item.item_id} 
              className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 snap-start transition-all duration-300"
            >
              <MenuCard
                foodName={item.item_name}
                imageSrc={item.item_image || 'https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU='}
                rating={item.rating || 4.5}
                time={item.preparation_time || 30}
                price={item.price}
                onAddClick={() => onAddToCart(item)}
                disabled={disabled}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MenuSlider;