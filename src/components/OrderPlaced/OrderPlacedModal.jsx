import React from 'react';
import { CheckCircle } from 'lucide-react';

const OrderPlacedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-md w-full p-6 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you an email confirmation with order details.
          </p>
          
          <button
            onClick={onClose}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPlacedModal;