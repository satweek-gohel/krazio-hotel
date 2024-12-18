import React from 'react';

const QuantitySection = ({ quantity, onQuantityChange }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Quantity</h3>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
        >
          -
        </button>
        <span className="text-xl font-semibold">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySection;