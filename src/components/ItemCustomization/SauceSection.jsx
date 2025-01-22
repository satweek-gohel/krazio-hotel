import React from 'react';
import QuantitySelector from './QuantitySelector';

const SauceSection = ({ sauceStep, selectedSauces, onSauceUpdate }) => {
  if (!sauceStep) return null;

  const handleSauceToggle = (sauce) => {
    const isSelected = selectedSauces.some(s => s.name === sauce.extra_ingredient_name);
    if (isSelected) {
      // Remove the sauce from the selected list
      onSauceUpdate(selectedSauces.filter(s => s.name !== sauce.extra_ingredient_name));
    } else {
      // Add the entire sauce object along with the quantity
      onSauceUpdate([
        ...selectedSauces,
        { ...sauce, name: sauce.extra_ingredient_name, quantity: 1 },
      ]);
    }
  };

  const handleQuantityChange = (sauceName, newQuantity) => {
    // Update the quantity for the selected sauce
    onSauceUpdate(
      selectedSauces.map(s =>
        s.name === sauceName ? { ...s, quantity: newQuantity } : s
      )
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Sauces</h3>
      <div className="space-y-2">
        {sauceStep.category_steps_item.map((sauce) => {
          const selectedSauce = selectedSauces.find(s => s.name === sauce.extra_ingredient_name);
          const isSelected = !!selectedSauce;

          return (
            <div
              key={sauce.branch_extra_ingredient_category_steps_item}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <label className="flex items-center flex-1">
                <input
                  type="checkbox"
                  value={sauce.extra_ingredient_name}
                  checked={isSelected}
                  onChange={() => handleSauceToggle(sauce)}
                  className="mr-3"
                />
                <span>{sauce.extra_ingredient_name}</span>
              </label>
              <div className="flex items-center gap-4">
                {isSelected && (
                  <QuantitySelector
                    quantity={selectedSauce.quantity}
                    onQuantityChange={(newQuantity) =>
                      handleQuantityChange(sauce.extra_ingredient_name, newQuantity)
                    }
                    size="small"
                  />
                )}
                <span className="min-w-[60px] text-right">
                  ${(sauce.price * (selectedSauce?.quantity || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SauceSection;
