import React from 'react';
import { Plus, Minus } from 'lucide-react';


const ExtraToppings= ({
  toppings,
  onToppingsChange
}) => {
  const availableToppings = [
    { name: 'Feta Cheese', price: 2.00 },
    { name: 'Panner', price: 4.00 }
  ];

  const handleQuantityChange = (toppingName, delta) => {
    const currentTopping = toppings.find(t => t.name === toppingName);
    const newQuantity = (currentTopping?.quantity || 0) + delta;
    
    if (newQuantity <= 0) {
      onToppingsChange(toppings.filter(t => t.name !== toppingName));
    } else {
      onToppingsChange(
        currentTopping
          ? toppings.map(t => t.name === toppingName ? {...t, quantity: newQuantity} : t)
          : [...toppings, { name: toppingName, quantity: newQuantity }]
      );
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Extra Toppings</h3>
      <div className="space-y-4">
        {availableToppings.map((topping) => {
          const currentQuantity = toppings.find(t => t.name === topping.name)?.quantity || 0;
          
          return (
            <div key={topping.name} className="flex items-center justify-between">
              <span>{topping.name}</span>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(topping.name, -1)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  disabled={currentQuantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span>{currentQuantity}</span>
                <button
                  onClick={() => handleQuantityChange(topping.name, 1)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="w-16 text-right">${topping.price.toFixed(2)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtraToppings;