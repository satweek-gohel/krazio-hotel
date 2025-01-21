import React from 'react';
import { PartyPopper, Download } from 'lucide-react';

function OrderPlaced() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full relative">
        <div className="absolute top-8 right-8">
          <div className="bg-primary p-2 rounded-full">
            <Download className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex flex-col items-center mb-6">
            <div className="img mb-10">
        <img src="/order-placed.svg" alt="" height={60} width={60} />
        </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Placed</h1>
          <p className="text-gray-500 text-center mt-2">
            To Office - 22 Trump Tower, Hover Road, New York 3457450
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex justify-start items-center border-b pb-4  gap-8">
            <span className="font-semibold text-sm">SUSHI HOUSE | </span>
            <span className="text-gray-500 text-sm">1901 Thornridge Cir. Shiloh, Hawaii 61063</span>
          </div>

          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Customer Name | </span>
            <span className="text-gray-500 text-sm">Rajat Sharma</span>
          </div>

          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Address | </span>
            <span className="text-gray-500 text-sm">4517 Washington Ave. Manchester, Kentucky 39495</span>
          </div>

          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Mobile No. | </span>
            <span className="text-gray-500 text-sm">+1 6597826582</span>
          </div>

          <div className="flex justify-start items-center border-b pb-4 gap-8">
            <span className="font-semibold text-sm">Email | </span>
            <span className="text-gray-500 text-sm">Rajat@gmail.com</span>
          </div>
        </div>

        <div className="mb-6">
          <img
            src="/order-paced-map.svg"
            alt="Map"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-primary text-white py-3 rounded-lg">
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;