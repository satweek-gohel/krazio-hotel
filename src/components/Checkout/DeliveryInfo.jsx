import React, { useEffect, useState } from "react";
import { MapPin, Clock, Circle } from "lucide-react";
import { useCart } from "../../contexts/CartContext";

export default function DeliveryInfo({ restaurantName, deliveryTime, address }) {
  const { orderType } = useCart();
  const [isDeliveryVisible, setIsDeliveryVisible] = useState(true);

  useEffect(() => {
    if (orderType === "Delivery") {
      setIsDeliveryVisible(true);
    } else if (orderType === "Pick Up") {
      setIsDeliveryVisible(false);
    }
  }, [orderType]);

  

  return (
    <div className="mb-6 relative pl-7 md:pl-8">
      {/* Vertical line */}
      <div className="absolute left-2.5 md:left-3 top-3 bottom-3 w-0.5 bg-gray-300"></div>

      {/* Restaurant point */}
      <div className="relative mb-8">
        <Circle className="absolute -left-7 md:-left-8 top-1 w-5 h-5 md:w-6 md:h-6 text-primary fill-white" />
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base md:text-lg">{restaurantName}</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600 flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4" />
              {deliveryTime}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery point */}
      {isDeliveryVisible && (
        <div className="relative">
          <MapPin className="absolute -left-7 md:-left-8 top-1 w-5 h-5 md:w-6 md:h-6 text-primary fill-white" />
          <p className="text-sm md:text-base text-black font-semibold">
            {/* {isNaN(address) || !address ? "Pick Up" : address} */}
            {address}
          </p>
        </div>
      )}
    </div>
  );
}
