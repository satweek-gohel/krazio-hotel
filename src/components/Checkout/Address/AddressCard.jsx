import React from 'react';

export default function AddressCard({ address, onSelect, isSelectable = true }) {
  return (
    <div className="border rounded-lg p-4 hover:border-primary cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium">{address.streetAddress}</h3>
          <p className="text-sm text-gray-500">
            {address.aptNumber && `Apt ${address.aptNumber}, `}{address.state} {address.zipCode}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">•••</button>
      </div>
      {isSelectable && (
        <button
          onClick={() => onSelect(address)}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-700"
        >
          Deliver Here
        </button>
      )}
    </div>
  );
}