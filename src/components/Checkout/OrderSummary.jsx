import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Minus, Plus, MessageSquare } from 'lucide-react';

const OrderSummary = () => {
  const { items, totalPrice, updateQuantity } = useCart();
  const [orderType, setOrderType] = useState('Delivery');
  const [deliveryTime, setDeliveryTime] = useState('Now');
  const [selectedDateTime, setSelectedDateTime] = useState('');

  const handleDeliveryTimeChange = (type) => {
    setDeliveryTime(type);
  
    if (type === 'Now') {
      setSelectedDateTime('');
    }
  };
  const handleOrderTypeChange = (type) => {
    setOrderType(type);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };


  return (
    <div className="bg-white  rounded-xl shadow-sm max-w-xl w-full md:p-4">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      {/* Order Type Selection */}
      <div className="mb-6 flex justify-between">
      <p className="text-gray-700 mb-2">Order Type</p>
      <div className="flex gap-3">
        <button 
          onClick={() => handleOrderTypeChange('Delivery')}
          className={`px-4 py-2 rounded text-sm transition-colors duration-200 md:w-[100px] ${
            orderType === 'Delivery' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Delivery
        </button>
        <button 
          onClick={() => handleOrderTypeChange('Pick Up')}
          className={`px-4 py-2 rounded text-sm transition-colors duration-200 md:w-[100px] ${
            orderType === 'Pick Up' 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          Pick Up
        </button>
      </div>
    </div>

  {orderType === 'Delivery' && 
      <div className="mb-6 flex justify-between">
        <p className="text-gray-700 mb-2">Food Delivery Time</p>
        <div className="flex gap-3">
          <button 
            onClick={() => handleDeliveryTimeChange('Now')}
            className={`px-4 py-2 rounded text-sm transition-colors duration-200 md:w-[100px] ${
              deliveryTime === 'Now' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Now
          </button>
          <button 
            onClick={() => handleDeliveryTimeChange('Later')}
            className={`px-4 py-2 rounded text-sm transition-colors duration-200 md:w-[100px] ${
              deliveryTime === 'Later' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Later
          </button>
        </div>
      </div>}

      {deliveryTime === 'Later' && orderType ==='Delivery' && (
        <div className="mb-6">
          <input 
            type="datetime-local"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
            className="w-full px-4 py-2 border rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
      )}

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Order</h3>
        <div className="space-y-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="grid grid-cols-4 items-center gap-4 p-3 rounded border border-gray-100"
        >
          {/* Item Name - Left Column */}
          <div className="col-span-2 flex flex-col">
            <span className="font-medium text-left">{item.item_name}</span>
            {item.selectedToppings && item.selectedToppings.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                {item.selectedToppings.join(', ')}
              </p>
            )}
          </div>

          {/* Quantity Controls - Center Column */}
          <div className="col-span-1 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-gray-100 border rounded p-1">
            <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
                className={`p-1 rounded-full text-white ${
                  item.quantity === 1 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary'
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 bg-primary rounded-full text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Price - Right Column */}
          <div className="col-span-1 text-right">
            <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
            {item.selectedToppings && item.selectedToppings.length > 0 && (
              <p className="text-sm text-gray-500">
                +{formatPrice(item.selectedToppings.length * 1.5 * item.quantity)}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>

        {/* Subtotal */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Delivery Fee</span>
            <span>{formatPrice(5.99)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
            <span>Total</span>
            <span>{formatPrice(totalPrice + 5.99)}</span>
          </div>
        </div>
      </div>

      {/* Tip Section */}
      <div className="mb-6 border p-3 rounded">
        <div className="flex items-center gap-2 mb-4">
          <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=50&h=50&fit=crop" alt="Tip" className="w-8 h-8 rounded-full" />
          <p className="text-sm text-gray-600">If am shine, they deliver your orders with care. Show your support with a small tip.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700">$20</button>
          <button className="flex-1 py-2 bg-primary text-white rounded-lg">$40</button>
          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700">$60</button>
          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700">Other</button>
        </div>
      </div>

      {/* Place Order Button */}
      <button className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;