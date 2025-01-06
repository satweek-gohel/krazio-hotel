import { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import CartItem from "./CartItem";
import TipSection from "./TipSection";
import OrderTypeSelector from "./OrderTypeSelector";
import { formatPrice } from "../../utils/orderCalculate";
import { useLocation } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
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
    placeOrder,
  } = useCart();

  const today = new Date()
    .toLocaleString("en-US", { weekday: "short" })
    .toLowerCase();

  const { branchDetails } = location.state || {};
  const schedule = branchDetails.branch_details[0].branch_schedule;
  const currentDaySchedule = schedule?.find((day) => day.day === today);
  const [hours, minutes, seconds] = currentDaySchedule.close_time
    .split(":")
    .map(Number);

  const milliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

  const totalTimeToCreateTheFood = new Date(
    new Date().getTime() + 30 * 60 * 1000
  ); // Add 30 minutes in milliseconds + estimateTime;

  const condition = milliseconds < totalTimeToCreateTheFood;

  useEffect(() => {
    if (condition) {
      // setOrderType('Delivery')
      setDeliveryTime("Later");
    }
  }, []);

  const isOrderEnabled = () => {
    return paymentMethod && selectedAddress;
  };

  const handlePlaceOrder = () => {
    const orderData = placeOrder();
    if (orderData) {
      console.log("Order successfully placed:", orderData);
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
    <div
      className="bg-white rounded-xl shadow-lg max-w-xl w-full p-4 border overflow-auto"
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

      <OrderTypeSelector
        condition={condition}
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
          ${
            isOrderEnabled()
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        {isOrderEnabled()
          ? "Place Order"
          : "Select Payment Method to Place Order"}
      </button>
    </div>
  );
};

export default OrderSummary;
