import React from 'react';
import { Check } from 'lucide-react';



export default function PaymentOption({ icon, label, selected, onClick, children }) {
  return (
    <div 
      className={`p-4 border rounded-lg mb-3 cursor-pointer transition-all ${
        selected ? 'border-red-500' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          selected ? 'border-red-500' : 'border-gray-300'
        }`}>
          {selected && <Check size={16} className="text-red-500" />}
        </div>
      </div>
      {selected && children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}