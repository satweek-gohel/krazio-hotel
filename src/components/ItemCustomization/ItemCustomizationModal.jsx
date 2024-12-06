import React from 'react';
import { X } from 'lucide-react';
import SizeSelector from './SizeSelector';
import OptionsSelector from './OptionsSelector';
import ExtraToppings from './ExtraToppings';
import QuantityControl from './QuantityControl';




const ItemCustomizationModal = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedSize, setSelectedSize] = React.useState('medium');
  const [quantity, setQuantity] = React.useState(1);
  const [selectedOptions, setSelectedOptions] = React.useState(['Ham & Cheese']);
  const [extraToppings, setExtraToppings] = React.useState([]);

  if (!isOpen) return null;

  const prices = {
    regular: 15,
    medium: 25,
    large: 30,
  };

  const calculateTotal = () => {
    const basePrice = prices[selectedSize];
    const toppingsTotal = extraToppings.reduce((sum, topping) => 
      sum + (topping.quantity * (topping.name === 'Feta Cheese' ? 2.00 : 4.00)), 0);
    return (basePrice + toppingsTotal) * quantity;
  };

  const handleSubmit = () => {
    onAddToCart({
      ...item,
      size: selectedSize,
      quantity,
      options: selectedOptions,
      extraToppings,
      totalPrice: calculateTotal()
    });
    onClose();
  };
 

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{item.item_name}</h2>
          <p className="text-gray-600 mb-6">Customize Your {item.item_name}</p>

          <SizeSelector
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
            prices={prices}
          />

          <div className="my-6">
            <h3 className="text-lg font-semibold mb-4">H&H Options</h3>
            <OptionsSelector
              selectedOptions={selectedOptions}
              onOptionToggle={(option) => {
                setSelectedOptions(prev => 
                  prev.includes(option)
                    ? prev.filter(o => o !== option)
                    : [...prev, option]
                );
              }}
            />
          </div>

          <ExtraToppings
            toppings={extraToppings}
            onToppingsChange={setExtraToppings}
          />

          <div className="mt-6 space-y-4">
          <QuantityControl />
            
            <button
              onClick={handleSubmit}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Add To Order - ${calculateTotal().toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCustomizationModal;