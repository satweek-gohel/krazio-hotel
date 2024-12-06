import React from 'react';



export default function AddressStep({ onAddNewAddress, onSelectAddress }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Delivery Address</h2>
      <p className="text-gray-600">Choose where to deliver your order</p>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Existing Address Card */}
        <div className="border rounded-lg p-4 hover:border-red-500 cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">Gokuldham Society</h3>
              <p className="text-sm text-gray-500">20.6 km</p>
              <p className="text-sm text-gray-500">SG Highway, Ahmedabad, Gujarat, India</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">•••</button>
          </div>
          <button
            onClick={onSelectAddress}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Deliver
          </button>
        </div>

        {/* Add New Address Card */}
        <div className="border rounded-lg p-4 hover:border-red-500 cursor-pointer">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium">Add New Address</h3>
              <p className="text-sm text-gray-500">Add a new delivery address</p>
            </div>
          </div>
          <button
            onClick={onAddNewAddress}
            className="w-full border-2 border-red-500 text-red-500 py-2 rounded-md hover:bg-red-50"
          >
            Add New
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium mb-4">Delivery Instructions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-red-500 text-white rounded-full text-sm">
            Leave at the door
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Avoid ringing bell
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Avoid calling
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">
            Other Details
          </button>
        </div>
      </div>
    </div>
  );
}