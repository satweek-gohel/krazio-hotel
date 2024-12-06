import React from 'react';



const SizeSelector= ({
  selectedSize,
  onSizeSelect,
  prices
}) => {
  return (
    <div className="space-y-2">
      {Object.entries(prices).map(([size, price]) => (
        <label
          key={size}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="size"
              checked={selectedSize === size}
              onChange={() => onSizeSelect(size)}
              className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
            />
            <span className="ml-3 capitalize">{size}</span>
          </div>
          <span className="text-gray-600">${price}</span>
        </label>
      ))}
    </div>
  );
};

export default SizeSelector;