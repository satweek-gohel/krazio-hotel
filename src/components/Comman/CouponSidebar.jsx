import React from 'react';
import { X, Copy } from 'lucide-react';


const CouponSidebar = ({ isOpen, onClose }) => {
  const coupons = [
    {
      discount: '10% Off',
      description: 'On Purchase on Pizza items',
      expiryDate: '22 Dec, 2024',
    },
    {
      discount: '15% Off',
      description: 'On all Burger items',
      expiryDate: '25 Dec, 2024',
    },
    {
      discount: '20% Off',
      description: 'On your first order',
      expiryDate: '31 Dec, 2024',
    }
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-full bg-gray-50 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-semibold">Available Coupons</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
          <X className="h-6 w-6 text-white bg-black rounded-full p-1" />

          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Left red section with vertical text */}
              <div className="bg-red-600 w-[70px] flex items-center justify-center relative">
                <div className="transform -rotate-90 whitespace-nowrap text-white text-2xl font-bold absolute w-[120px] text-center">
                  {coupon.discount}
                </div>
                
                {/* Circular cutouts */}
                <div className="absolute -left-3 -bottom- w-6 h-6 bg-gray-50 rounded-full" />
              </div>

              {/* Content section */}
              <div className="flex-1 p-2 pl-5">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="parent flex justify-between items-start">
                    <div className="left">
                  <p className="text-blsck-600 text-lg mb-2 font-bold">Extra {coupon.discount}</p>
                    <p className="text-gray-600 text-sm mb-2">{coupon.description}</p>
                    </div>
                    <div className="right">
                    <button className=" text-red-600 font-semibold text-right hover:text-red-700 transition-colors">
                    Apply
                  </button>
                    </div>
                    </div>
                    <div className="border-t border-dashed my-3" />
                    <p className="text-xs text-gray-500">*Expires on {coupon.expiryDate}</p>
                  </div>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CouponSidebar;