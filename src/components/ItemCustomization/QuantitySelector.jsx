import React from 'react';

const QuantitySelector = ({ quantity, onQuantityChange, size = "normal" }) => {
  return (
    <div className="flex items-center border bg-gray-100 p-1 rounded">
      <button
        onClick={() => quantity > 1 && onQuantityChange(quantity - 1)}
        className={`${
          size === "small" ? "w-6 h-6" : "w-8 h-8"
        } flex items-center justify-center rounded-full border border-gray-300 bg-primary text-white `}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className={`mx-3 ${size === "small" ? "text-sm" : "text-base"}`}>{quantity}</span>
      <button
        onClick={() => onQuantityChange(quantity + 1)}
        className={`${
          size === "small" ? "w-6 h-6" : "w-8 h-8"
        } flex items-center justify-center rounded-full border border-gray-300 text-gray-500 bg-primary text-white`}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;