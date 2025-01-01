import React from 'react';

const SizeSection = ({ sizeStep, selectedSize, onSizeSelect }) => {
  if (!sizeStep) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Size</h3>
      <div className="space-y-2">
        {sizeStep.category_steps_item.map((size) => (
          <label 
            key={size.branch_extra_ingredient_category_steps_item} 
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
              selectedSize === size.extra_ingredient_name ? 'border-red-500 bg-red-50' : ''
            }`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="size"
                value={size.extra_ingredient_name}
                checked={selectedSize === size.extra_ingredient_name}
                onChange={(e) => onSizeSelect(e.target.value)}
                className="mr-3"
              />
              <span>{size.extra_ingredient_name}</span>
            </div>
            <span>${size.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SizeSection;