import React from 'react';
import { MapPin, Clock } from 'lucide-react';



export default function DeliveryInfo({ restaurantName, deliveryTime, address }) {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-2 mb-2">
        <MapPin className="w-5 h-5 text-red-500 mt-1" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{restaurantName}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Delivery in: {deliveryTime}
            </span>
          </div>
          <p className="text-gray-500 text-sm">{address}</p>
        </div>
      </div>
    </div>
  );
}