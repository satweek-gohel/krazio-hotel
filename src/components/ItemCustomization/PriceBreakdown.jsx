import React from 'react';

const PriceBreakdown = ({ 
  basePrice, 
  sizePrice, 
  selectedSize,
  childItemsPrice,
  saucesPrice,
  tastePrice,
  selectedTaste,
  totalPrice 
}) => {
  return (
    <div className="space-y-2 text-sm text-gray-600">
      <div className="flex justify-between">
        <span>Base Price:</span>
        <span>${basePrice.toFixed(2)}</span>
      </div>
      {sizePrice > 0 && (
        <div className="flex justify-between">
          <span>Size ({selectedSize}):</span>
          <span>${sizePrice.toFixed(2)}</span>
        </div>
      )}
      {childItemsPrice > 0 && (
        <div className="flex justify-between">
          <span>Additional Items:</span>
          <span>${childItemsPrice.toFixed(2)}</span>
        </div>
      )}
      {saucesPrice > 0 && (
        <div className="flex justify-between">
          <span>Sauces:</span>
          <span>${saucesPrice.toFixed(2)}</span>
        </div>
      )}
      {tastePrice > 0 && (
        <div className="flex justify-between">
          <span>Taste ({selectedTaste}):</span>
          <span>${tastePrice.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-semibold border-t pt-2">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default PriceBreakdown;