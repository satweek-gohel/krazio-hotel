import React, { useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import CartItem from './CartItem';
import TipSection from './TipSection';
import OrderTypeSelector from './OrderTypeSelector';
import { formatPrice } from '../../utils/orderCalculate';

const OrderSummary = () => {
  const { 
    items,
    orderType,
    setOrderType,
    deliveryTime,
    setDeliveryTime,
    selectedDateTime,
    setSelectedDateTime,
    selectedTip,
    setSelectedTip,
    updateQuantity,
    orderCalculation,
    isCalculating,
    paymentMethod,
    selectedAddress,
    placeOrder
  } = useCart();

  useEffect(() => {
    const branchSchedule = JSON.parse(localStorage.getItem('branch_schedule'));
    const isBranchOpen = branchSchedule?.some(schedule => schedule.is_open === "1");
    
    if (isBranchOpen) {
      setOrderType('Delivery');
      setDeliveryTime('Later')
      const today = new Date();
      const nextFiveDays = new Date(today);
      nextFiveDays.setDate(today.getDate() + 5);
      const formattedDate = nextFiveDays.toISOString().slice(0, 10);
      setSelectedDateTime(formattedDate);
    }
  }, [setOrderType, setSelectedDateTime]);

  const isOrderEnabled = () => {
    return paymentMethod && selectedAddress;
  };

  const handlePlaceOrder = () => {
    const orderData = placeOrder();
    if (orderData) {
      console.log('Order successfully placed:', orderData);
    }
  };

  const renderOrderSummary = () => {
    if (isCalculating) {
      return (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
        </div>
      );
    }

    return (
      <div className="border-t pt-4 space-y-2">
        {orderCalculation?.payable_amount?.map((item, index) => (
          <div key={index} className="flex justify-between text-sm text-black">
            <span className="font-semibold">{item.title}</span>
            <span>{formatPrice(Number(item.value))}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-xl w-full p-4 border overflow-auto" 
         style={{ maxHeight: 'calc(100vh - 150px)' }}>
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      <OrderTypeSelector
        orderType={orderType}
        onOrderTypeChange={setOrderType}
        deliveryTime={deliveryTime}
        onDeliveryTimeChange={setDeliveryTime}
        selectedDateTime={selectedDateTime}
        onDateTimeChange={setSelectedDateTime}
      />

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <CartItem
            key={`${item.id}-${JSON.stringify(item.selectedToppings)}`}
            item={item}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>

      <TipSection
        tips={orderCalculation?.branch_tips}
        selectedTip={selectedTip}
        onTipSelect={setSelectedTip}
      />

      {renderOrderSummary()}

      <button 
        onClick={handlePlaceOrder}
        disabled={!isOrderEnabled()}
        className={`w-full py-3 rounded-lg font-medium transition-colors mt-6
          ${isOrderEnabled()
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        {isOrderEnabled() ? 'Place Order' : 'Select Payment Method to Place Order'}
      </button>
    </div>
  );
};

export default OrderSummary;