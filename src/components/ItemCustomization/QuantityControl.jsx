import React from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantityControl = ({
  quantity,
  onChange,
  total
}) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onChange(Math.max(1, quantity - 1))}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Minus className="w-5 h-5" />
        </button>
        <span className="text-xl font-medium">{quantity}</span>
        <button
          onClick={() => onChange(quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <span className="font-semibold">Total: ${total}</span>
    </div>
  );
};

export default QuantityControl;