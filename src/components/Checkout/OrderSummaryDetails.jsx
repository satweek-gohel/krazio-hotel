import React from 'react';
import { formatPrice } from '../../utils/orderCalculations';

const OrderSummaryDetails = ({ payableAmount, isCalculating }) => {
  if (isCalculating) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="border-t pt-4 space-y-2">
      {payableAmount?.map((item, index) => (
        <div key={index} className="flex justify-between text-sm text-black">
          <span className="font-semibold">{item.title}</span>
          <span>{formatPrice(Number(item.value))}</span>
        </div>
      ))}
    </div>
  );
};

export default OrderSummaryDetails;