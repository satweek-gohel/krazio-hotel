import React, { useState } from 'react';

import PromotionalSlider from '../components/Base/BasePromotionSlider'; 
import Category from '../components/Base/BaseCategory';
import { categories, desserts, images2, menuItems, pizzas, toppicks } from '../components/Enumes/Enumes';
import MenuCard from '../components/Base/BaseMenuCard';

function BranchPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    // If the same category is clicked again, deselect it
    setSelectedCategory(prevCategory => 
      prevCategory === category ? null : category
    );
  };

  // Filter menu items based on selected category
  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory.name)
    : menuItems;

  const handleAddToCart = (item) => {
    console.log(`Added ${item.foodName} to cart`);
  };

  return (
    <div className="container mx-auto px-0 md:px-[100px] py-0 md:py-[50px] branch-page"> 
      <PromotionalSlider title="Deals For You" images={images2} />
      <Category 
        title="Food Categories" 
        categories={categories} 
        onSelect={handleCategorySelect} 
      />

<h2 className="text-2xl font-bold text-left mb-6 px-4">Top picks menu for easy online food delivery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {toppicks.map(item => (
          <MenuCard
            key={item.id}
            foodName={item.foodName}
            imageSrc={item.imageSrc}
            rating={item.rating}
            time={item.time}
            price={item.price}
            onAddClick={() => handleAddToCart(item)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold text-left mb-6 px-4">Desserts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {desserts.map(item => (
          <MenuCard
            key={item.id}
            foodName={item.foodName}
            imageSrc={item.imageSrc}
            rating={item.rating}
            time={item.time}
            price={item.price}
            onAddClick={() => handleAddToCart(item)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold text-left mb-6 px-4">Pizzas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pizzas.map(item => (
          <MenuCard
            key={item.id}
            foodName={item.foodName}
            imageSrc={item.imageSrc}
            rating={item.rating}
            time={item.time}
            price={item.price}
            onAddClick={() => handleAddToCart(item)}
          />
        ))}
      </div>
      



      
    </div>
  );
}

export default BranchPage;