import React from 'react';
import { Pizza } from 'lucide-react';

const CategoryItem = ({ category, onSelect }) => {
  return (
    <div className="flex-shrink-0 transition-all duration-300 w-1/4 sm:w-1/6 md:w-1/8 lg:w-1/10 xl:w-1/12 flex justify-center p-[10px]">
      <div 
        className="flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        onClick={() => onSelect && onSelect(category)}
        style={{ 
          backgroundColor: category.category_bg_color || '#ffffff',
          borderRadius: '8px',
          padding: '12px'
        }}
      >
        <div className="relative w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden mb-2">
          {category.category_image ? (
            <img
              src={category.category_image}
              alt={category.category_name}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <Pizza className="w-8 h-8 text-gray-600" />
          )}
        </div>
        <p className="text-sm text-center font-bold line-clamp-2">
          {category.category_name}
        </p>
      </div>
    </div>
  );
};

export default CategoryItem;