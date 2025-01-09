import React, { useEffect } from "react";
import { ShoppingCart, X } from "lucide-react";

const EmptyCartModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div
          className="relative bg-white rounded-lg max-w-sm w-full mx-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full transition-colors bg-black p-1 "
          >
            <X className="h-5 w-5 text-white" />
          </button>

          <div className="p-6 sm:p-8">
            <div className="w-20 h-20 mx-auto bg-red-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingCart className="h-10 w-10 text-primary" />
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Your Cart is Empty
            </h3>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet. Explore
              our menu to find something delicious!
            </p>

            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartModal;
