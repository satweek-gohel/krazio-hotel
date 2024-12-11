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
    <div className="bg-white rounded-lg shadow-lg shadow-slate-300 overflow-hidden">
     

      {/* Restaurant Header */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="img shadow-lg rounded-lg p-2">
          <img src="/res-icon.svg" alt=""  className='w-8 h-8 shadow-lg rounded-lg'/>
          </div>
          <h2 className="text-xl font-[900] uppercase text-gray-800">{name}</h2>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Restaurant Details */}
      <div className="p-4 space-y-3">
        {/* Address */}
        <div className="flex items-center gap-3">
         
          <img src="/home-location-dark.svg" alt=""  className='w-5 h-5'/>
          <p className="text-gray-600">{address}</p>
        </div>

        {/* Opening Hours */}
        <div className="flex items-center gap-3">
        <img src="/home-time-dark.svg" alt=""  className='w-5 h-5'/>
          <p className="text-gray-600">{hours}</p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 divide-x divide-gray-200 gap-4 p-3 rounded">
        <button 
          onClick={onPickup}
          className="flex items-center justify-center gap-2 p-2 bg-red-600 text-white hover:bg-red-600 transition-colors rounded"
        >
         
          <span className="font-medium">Pickup</span>
        </button>
        <button 
          onClick={onDelivery}
          className="flex items-center justify-center gap-2 p-2 bg-red-600 text-white hover:bg-red-600 transition-colors rounded"
        >
         
          <span className="font-medium">Delivery</span>
        </button>
      </div>
    </div>
  );
};

export default BaseCard;