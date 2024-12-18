import React from 'react';

const SauceSection = ({ sauceStep, selectedSauces, onSauceToggle }) => {
  if (!sauceStep) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Sauces</h3>
      <div className="space-y-2">
        {sauceStep.category_steps_item.map((sauce) => (
          <label 
            key={sauce.branch_extra_ingredient_category_steps_item} 
            className="flex items-center p-3 border rounded-lg justify-between"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                value={sauce.extra_ingredient_name}
                checked={selectedSauces.includes(sauce.extra_ingredient_name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onSauceToggle([...selectedSauces, sauce.extra_ingredient_name]);
                  } else {
                    onSauceToggle(selectedSauces.filter(s => s !== sauce.extra_ingredient_name));
                  }
                }}
                className="mr-3"
              />
              <span>{sauce.extra_ingredient_name}</span>
            </div>
            <span>${sauce.price}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SauceSection;