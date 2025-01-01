import React from 'react';
import QuantitySelector from './QuantitySelector';

const ToppingsSection = ({ 
  selectedSize, 
  sizeStep, 
  selectedToppings, 
  onToppingUpdate 
}) => {
  if (!selectedSize || !sizeStep) return null;

  const selectedSizeItem = sizeStep.category_steps_item.find(
    size => size.extra_ingredient_name === selectedSize
  );

  if (!selectedSizeItem?.price_for_parent_item?.length) return null;

  const handleToppingToggle = (toppingName) => {
    const isSelected = selectedToppings.some(t => t.name === toppingName);
    if (isSelected) {
      onToppingUpdate(selectedToppings.filter(t => t.name !== toppingName));
    } else {
      onToppingUpdate([...selectedToppings, { name: toppingName, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (toppingName, newQuantity) => {
    onToppingUpdate(
      selectedToppings.map(t => 
        t.name === toppingName ? { ...t, quantity: newQuantity } : t
      )
    );
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Extra Toppings</h3>
      <div className="space-y-2">
        {selectedSizeItem.price_for_parent_item.map((topping) => {
          const selectedTopping = selectedToppings.find(t => t.name === topping.extra_ingredient_name);
          const isSelected = !!selectedTopping;

          return (
            <div
              key={topping.branch_extra_ingredient_price_for_parent_item}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <label className="flex items-center flex-1">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => handleToppingToggle(topping.extra_ingredient_name)}
                  className="mr-3"
                />
                <span>{topping.extra_ingredient_name}</span>
              </label>
              <div className="flex items-center gap-4">
                {isSelected && (
                  <QuantitySelector
                    quantity={selectedTopping.quantity}
                    onQuantityChange={(newQuantity) => 
                      handleQuantityChange(topping.extra_ingredient_name, newQuantity)
                    }
                    size="small"
                  />
                )}
                <span className="min-w-[60px] text-right">
                  ${(topping.price * (selectedTopping?.quantity || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToppingsSection;