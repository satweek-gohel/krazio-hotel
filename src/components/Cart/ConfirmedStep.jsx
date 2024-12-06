import React from 'react';
import { Check, Download } from 'lucide-react';

const ConfirmedStep = ({ orderDetails }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-xl font-bold mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-500">Your order has been confirmed</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span className="font-medium">02BQWDE</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Time</span>
            <span className="font-medium">ASAP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-medium">$500.00</span>
          </div>
        </div>
      </div>

      <button className="w-full py-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Download Receipt
      </button>
    </div>
  );
};

export default ConfirmedStep;