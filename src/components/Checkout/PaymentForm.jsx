import React, { useState } from 'react';
import { Banknote, CreditCard, Gift, ChartBar } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import PaymentOption from './PaymentOption';
import DeliveryInfo from './DeliveryInfo';

export default function PaymentForm({ onSubmit }) {
  const { setPaymentMethod } = useCart();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [giftCardData, setGiftCardData] = useState({
    cardNumber: '',
    pin: ''
  });

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    // Immediately set payment method in context when selected
    const paymentData = method === 'gift' 
      ? { method, ...giftCardData }
      : { method };
    setPaymentMethod(paymentData);
  };

  const handleGiftCardChange = (field, value) => {
    const newGiftCardData = { ...giftCardData, [field]: value };
    setGiftCardData(newGiftCardData);
    if (selectedMethod === 'gift') {
      setPaymentMethod({ method: 'gift', ...newGiftCardData });
    }
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
        
        <div className="space-y-4">
          <PaymentOption
            icon={<Banknote className="w-6 h-6 text-green-500" />}
            label="Cash"
            selected={selectedMethod === 'cash'}
            onClick={() => handleMethodSelect('cash')}
          />

          <PaymentOption
            icon={<CreditCard className="w-6 h-6 text-blue-500" />}
            label="Credit Card"
            selected={selectedMethod === 'credit'}
            onClick={() => handleMethodSelect('credit')}
          />

          <PaymentOption
            icon={<Gift className="w-6 h-6 text-red-500" />}
            label="Gift Card"
            selected={selectedMethod === 'gift'}
            onClick={() => handleMethodSelect('gift')}
          >
            {selectedMethod === 'gift' && (
              <div className="space-y-3 mt-3">
                <input
                  type="text"
                  placeholder="Gift Card Number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={giftCardData.cardNumber}
                  onChange={(e) => handleGiftCardChange('cardNumber', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Gift Card PIN"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={giftCardData.pin}
                  onChange={(e) => handleGiftCardChange('pin', e.target.value)}
                />
              </div>
            )}
          </PaymentOption>

          <PaymentOption
            icon={<ChartBar className="w-6 h-6 text-purple-500" />}
            label="Royalty Points"
            selected={selectedMethod === 'points'}
            onClick={() => handleMethodSelect('points')}
          />
        </div>
      </div>
    </div>
  );
}