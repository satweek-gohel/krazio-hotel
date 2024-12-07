import React from 'react';

const DeliveryToggle = ({ selected, onToggle }) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 p-1">
      <button
        onClick={() => onToggle('delivery')}
        className={`
          px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm 
          rounded-md font-medium transition-colors 
          ${
            selected === 'delivery'
              ? 'bg-red-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        Delivery
      </button>
      <button
        onClick={() => onToggle('pickup')}
        className={`
          px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm 
          rounded-md font-medium transition-colors 
          ${
            selected === 'pickup'
              ? 'bg-red-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        Pick Up
      </button>
    </div>
  );
};

export default DeliveryToggle;