import React, { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import DeliveryToggle from '../Base/DeilveryToggle';



const RestaurantHeader = ({ name, address, hours }) => {
  const [deliveryMode, setDeliveryMode] = useState('delivery');

  return (
    <div className="main flex justify-end ">
    <div className="flex justify-end border-gray-200 rounded border shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-end gap-10">
          <div className="flex-2">
            <h1 className="text-lg font-bold text-gray-900">{name}</h1>
            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
              <img src="/clock.svg" className='h-4 w-4 mr-1' />
               
                <span className='text-red-600'>Min.Delivery in 20 mins</span>
              </div>
            </div>
          </div>
          <div className="flex-none">
            <DeliveryToggle selected={deliveryMode} onToggle={setDeliveryMode} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RestaurantHeader;