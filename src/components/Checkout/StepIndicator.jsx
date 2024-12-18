import React from 'react';
import { User, MapPin, CreditCard } from 'lucide-react';


export default function StepIndicator({ currentStep }) {
  const steps = [
    { icon: User, label: 'Account' },
    { icon: MapPin, label: 'Address' },
    { icon: CreditCard, label: 'Payment' },
  ];

  return (
    <div className="flex justify-start items-center  px-4 gap-5">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded flex items-center justify-center ${
                index + 1 <= currentStep
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <step.icon size={24} />
            </div>
           
              
           
          </div>
          
        </React.Fragment>
      ))}
    </div>
  );
}