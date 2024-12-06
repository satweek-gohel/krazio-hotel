import React from 'react';



const DeliveryToggle= ({ selected, onToggle }) => {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 p-1">
      <button
        onClick={() => onToggle('delivery')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          selected === 'delivery'
            ? 'bg-red-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Delivery
      </button>
      <button
        onClick={() => onToggle('pickup')}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          selected === 'pickup'
            ? 'bg-red-600 text-white'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Pick Up
      </button>
    </div>
  );
};

export default DeliveryToggle;