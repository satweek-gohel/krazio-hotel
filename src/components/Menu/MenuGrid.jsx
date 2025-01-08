import React from 'react';
import MenuCard from '../Base/BaseMenuCard';
import { ChefHat, UtensilsCrossed } from 'lucide-react';

const MenuGrid = ({ items, onAddToCart, disabled }) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] bg-neutral-50 rounded-lg border-2 border-dashed border-primary p-4 sm:p-6 md:p-8">
        <div className="relative mb-3 md:mb-4">
          <ChefHat className="w-12 h-12 md:w-16 md:h-16 text-neutral-300" />
          <UtensilsCrossed className="w-6 h-6 md:w-8 md:h-8 text-neutral-400 absolute -bottom-2 -right-2 transform rotate-12" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-neutral-700 mb-2 text-center">
          <span className='text-primary'>Kitchen</span> is Taking a Break
        </h3>
        <p className="text-sm md:text-base text-neutral-500 text-center max-w-[280px] sm:max-w-md mb-4 px-2">
          Our chefs are preparing something special. Please check back soon for exciting new dishes!
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm text-neutral-400">
          <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full bg-primary text-white">Coming Soon</span>
          <span className="inline-block px-3 py-1 bg-neutral-100 rounded-full bg-primary text-white">Stay Tuned</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {items.map(item => (
        <MenuCard
          key={item.item_id}
          foodName={item.item_name}
          imageSrc={item.item_image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000'}
          rating={item.rating || 4.5}
          time={item.item_preparation_time || 30}
          price={item.price}
          onAddClick={() => onAddToCart(item)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default MenuGrid;
