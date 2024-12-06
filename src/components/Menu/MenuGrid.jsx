import React from 'react';
import MenuCard from '../Base/BaseMenuCard';

function MenuGrid({ items, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(item => (
        <MenuCard
          key={item.item_id}
          foodName={item.item_name}
          imageSrc={item.item_image || 'https://media.istockphoto.com/id/1442417585/photo/person-getting-a-piece-of-cheesy-pepperoni-pizza.jpg?s=612x612&w=0&k=20&c=k60TjxKIOIxJpd4F4yLMVjsniB4W1BpEV4Mi_nb4uJU='}
          rating={4.5}
          time={30}
          price={item.price}
          onAddClick={() => onAddToCart(item)}
        />
      ))}
    </div>
  );
}

export default MenuGrid;