import React from 'react';
import { MapPin, Clock, Store, Truck } from 'lucide-react';

const BaseCard = ({ 
  name,
  address,
  hours,
  onPickup,
  onDelivery 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
     

      {/* Restaurant Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <Store className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Restaurant Details */}
      <div className="p-4 space-y-3">
        {/* Address */}
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-black-500" />
          <p className="text-gray-600">{address}</p>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-black-500" />
          <p className="text-gray-600">{hours}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        <button 
          onClick={onPickup}
          className="flex items-center justify-center gap-2 p-3 bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <Store className="w-5 h-5" />
          <span className="font-medium">Pickup</span>
        </button>
        <button 
          onClick={onDelivery}
          className="flex items-center justify-center gap-2 p-3 bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          <Truck className="w-5 h-5" />
          <span className="font-medium">Delivery</span>
        </button>
      </div>
    </div>
  );
};

export default BaseCard;