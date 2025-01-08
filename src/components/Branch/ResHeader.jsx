import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DeliveryToggle from '../Base/DeilveryToggle';

const RestaurantHeader = ({ name, address, hours }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [deliveryMode, setDeliveryMode] = useState(searchParams.get('mode') || 'delivery');

  const handleToggle = (mode) => {
    setDeliveryMode(mode);
    setSearchParams({ mode });
  };

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode) {
      setDeliveryMode(mode);
    }
  }, [searchParams]);

  return (
    <div className="main flex justify-end">
      <div className="flex justify-end border-gray-200 rounded border shadow-lg bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-end gap-10">
            <div className="flex-2">
              <h1 className="lg:text-lg font-semibold text-gray-900">{name}</h1>
              <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <img src="/clock.svg" className="h-4 w-4 mr-1 hidden md:block" />
                  <span className='text-xs text-primary'>Min.Delivery in 20 mins</span>
                </div>
              </div>
            </div>
            <div className="flex-none">
              <DeliveryToggle selected={deliveryMode} onToggle={handleToggle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;