import React, { useState } from 'react';
import cashImage from '/currency.svg';
import cardImage from '/credit-card.svg';
import giftImage from '/gift-card.svg';
import pointsImage from '/royalty.svg';

const PaymentStep = ({ onNext }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const paymentMethods = [
    { id: 'cash', name: 'Cash', image: cashImage },
    { id: 'card', name: 'Credit Card', image: cardImage },
    { id: 'gift', name: 'Gift Card', image: giftImage },
    { id: 'points', name: 'Royalty Points', image: pointsImage },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4">
        <div className="par flex items-center justify-evenly mb-5">
        <div className="image">
        <img src="/payment-pick-drop.svg" alt="" />
        </div>
       
        <div className="bg-white ">
          <div className="flex items-center justify-between">
          
            <span className="text-black font-bold">SUSHI HOUSE  <span className="text-gray-600 font-medium"> | Delivery in: 20 Mins</span></span>
          </div>
          
          <div className="flex items-center justify-between">
           
            <span className="text-black font-bold">Home<span className="text-gray-600 font-medium"> | SG Highway, Ahemdabad, Gujarat, India</span></span>
          </div>
        </div>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`w-full p-4 border rounded-lg flex items-center gap-3 ${
                selectedMethod === method.id ? 'border-red-500 bg-red-50' : ''
              }`}
            >
              <img src={method.image} alt={method.name} className="w-10 h-10 text-gray-400 shadow-lg border rounded p-2" />
              <span className="flex-1 text-left font-bold text-black">{method.name}</span>
              <div className={`w-5 h-5 rounded-full border-2 ${
                selectedMethod === method.id 
                  ? 'border-red-500 bg-red-500' 
                  : 'border-gray-300'
              }`} />
            </button>
          ))}
        </div>
      </div>

      <div className="border-t p-4">
        <button
          onClick={onNext}
          disabled={!selectedMethod}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;