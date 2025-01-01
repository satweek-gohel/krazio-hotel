import React, { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import AddressModal from './AddressModal';
import AddressCard from './AddressCard';
import { CheckCircle, XCircle, Phone, BellElectricIcon, Bell, BellOffIcon, DoorClosed, PhoneOff } from 'lucide-react'; // Importing icons

export default function AddressStep({ onNext }) {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const { 
    setSelectedAddress, 
    setDeliveryInstructions,
    deliveryInstructions,
    setCheckoutStep
  } = useCart();

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setCheckoutStep(2);
    onNext();
  };

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
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
        {/* Saved Addresses */}
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            address={address}
            onSelect={handleAddressSelect}
          />
        ))}

        {/* Add New Address Card */}
        <div 
          onClick={() => setShowModal(true)}
          className="border rounded-lg p-4 hover:border-red-500 cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">Add New Address</h3>
              <p className="text-sm text-gray-500">Add a new delivery address</p>
            </div>
          </div>
          <button className="w-full border-2 bg-primary text-white py-2 rounded-md ">
            Add New
          </button>
        </div>
      </div>

      {/* Delivery Instructions */}
      <div className="mt-8">
        <h3 className="font-medium mb-4">Delivery Instructions</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Leave at the door', icon: <DoorClosed size={16} /> },
            { label: 'Avoid ringing bell', icon: <BellOffIcon size={16} /> },
            { label: 'Avoid calling', icon: <PhoneOff size={16} /> }
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => handleInstructionToggle(label)}
              className={`flex items-center px-4 py-2 rounded text-sm ${
                deliveryInstructions.includes(label)
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {icon}
              <span className="ml-2">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Address Modal */}
      {showModal && (
        <AddressModal
          onClose={() => setShowModal(false)}
          onSave={handleAddAddress}
        />
      )}
    </div>
  );
}