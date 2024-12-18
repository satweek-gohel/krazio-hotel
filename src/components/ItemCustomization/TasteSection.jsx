import React from 'react';

const TasteSection = ({ tasteStep, selectedTaste, onTasteSelect }) => {
  if (!tasteStep) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Taste</h3>
      <div className="space-y-2">
        {tasteStep.category_steps_item.map((taste) => (
          <label 
            key={taste.branch_extra_ingredient_category_steps_item} 
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="taste"
                value={taste.extra_ingredient_name}
                checked={selectedTaste === taste.extra_ingredient_name}
                onChange={(e) => onTasteSelect(e.target.value)}
                className="mr-3"
              />
              <span>{taste.extra_ingredient_name}</span>
            </div>
            <span>${taste.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TasteSection;