import React, { useState } from 'react';
import { Banknote, CreditCard, Gift, ChartBar } from 'lucide-react';
import PaymentOption from './PaymentOption';
import DeliveryInfo from './DeliveryInfo';



export default function PaymentForm({ onSubmit, amount }) {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [giftCardData, setGiftCardData] = useState({
    cardNumber: '',
    pin: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ method: selectedMethod, ...giftCardData });
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Payment</h1>
      
      <DeliveryInfo 
        restaurantName="SUSHI HOUSE"
        deliveryTime="20 Mins"
        address="SG Highway, Ahmedabad, Gujarat, India"
      />

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Select Your Payment Preference</h2>
        
        <form onSubmit={handleSubmit}>
          <PaymentOption
            icon={<Banknote className="w-6 h-6 text-green-500" />}
            label="Cash"
            selected={selectedMethod === 'cash'}
            onClick={() => setSelectedMethod('cash')}
          />

          <PaymentOption
            icon={<CreditCard className="w-6 h-6 text-blue-500" />}
            label="Credit Card"
            selected={selectedMethod === 'credit'}
            onClick={() => setSelectedMethod('credit')}
          />

          <PaymentOption
            icon={<Gift className="w-6 h-6 text-red-500" />}
            label="Gift Card"
            selected={selectedMethod === 'gift'}
            onClick={() => setSelectedMethod('gift')}
          >
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Gift Card Number"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={giftCardData.cardNumber}
                onChange={(e) => setGiftCardData({ ...giftCardData, cardNumber: e.target.value })}
              />
              <input
                type="text"
                placeholder="Gift Card PIN"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={giftCardData.pin}
                onChange={(e) => setGiftCardData({ ...giftCardData, pin: e.target.value })}
              />
            </div>
          </PaymentOption>

          <PaymentOption
            icon={<ChartBar className="w-6 h-6 text-purple-500" />}
            label="Royalty Points"
            selected={selectedMethod === 'points'}
            onClick={() => setSelectedMethod('points')}
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors mt-6 font-medium"
          >
            Make Payment ${amount}
          </button>
        </form>
      </div>
    </div>
  );
}