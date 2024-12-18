import React from 'react';
import { useCart } from '../../contexts/CartContext';

export default function AddressStep({ onNext }) {
  const { 
    setSelectedAddress, 
    setDeliveryInstructions,
    deliveryInstructions
  } = useCart();

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    onNext();
  };

  const handleInstructionToggle = (instruction) => {
    setDeliveryInstructions(prev => {
      if (prev.includes(instruction)) {
        return prev.filter(i => i !== instruction);
      }
      return [...prev, instruction];
    });
  };

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-semibold">Delivery Address</h2>
      <p className="text-gray-600">Choose where to deliver your order</p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Existing Address Card */}
        <div className="border rounded-lg p-4 hover:border-red-500 cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">Gokuldham Society</h3>
              <p className="text-sm text-gray-500">20.6 km</p>
              <p className="text-sm text-gray-500">SG Highway, Ahmedabad, Gujarat, India</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">•••</button>
          </div>
          <button
            onClick={() => handleAddressSelect({
              name: 'Gokuldham Society',
              distance: '20.6 km',
              address: 'SG Highway, Ahmedabad, Gujarat, India'
            })}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-red-600"
          >
            Deliver Here
          </button>
        </div>

        {/* Add New Address Card */}
        <div className="border rounded-lg p-4 hover:border-red-500 cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">Add New Address</h3>
              <p className="text-sm text-gray-500">Add a new delivery address</p>
            </div>
          </div>
          <button
            className="w-full border-2 border-primary text-red-500 py-2 rounded-md hover:bg-red-50"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">Delivery Instructions</h3>
        <div className="flex flex-wrap gap-3">
          {['Leave at the door', 'Avoid ringing bell', 'Avoid calling', 'Other Details'].map((instruction) => (
            <button
              key={instruction}
              onClick={() => handleInstructionToggle(instruction)}
              className={`px-4 py-2 rounded-full text-sm ${
                deliveryInstructions.includes(instruction)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {instruction}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}