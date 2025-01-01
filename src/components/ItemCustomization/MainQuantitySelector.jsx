import React from 'react';
import QuantitySelector from './QuantitySelector';

const MainQuantitySelector = ({ quantity, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-6">
      
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />
    </div>
  );
};

export default MainQuantitySelector;