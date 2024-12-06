import React from 'react';
import { MapPin, CreditCard, Check } from 'lucide-react';

const CartSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Cart', icon: null },
    { id: 2, name: 'Address', icon: MapPin },
    { id: 3, name: 'Payment', icon: CreditCard },
    { id: 4, name: 'Confirmed', icon: Check },
  ];

  return (
    <div className="px-4 py-3 bg-gray-50 border-b">
      <div className="flex justify-between items-center">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex flex-col items-center ${
              currentStep >= step.id ? 'text-red-600' : 'text-gray-400'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
              currentStep >= step.id ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              {step.icon ? <step.icon className="w-4 h-4" /> : step.id}
            </div>
            <span className="text-xs">{step.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartSteps;