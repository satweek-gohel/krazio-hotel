import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import CartItem from "./CartItem";
import TipSection from "./TipSection";
import OrderTypeSelector from "./OrderTypeSelector";
import { formatPrice } from "../../utils/orderCalculate";
import { findLargestTimestamp } from "../../utils/cartHelpers";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBranchData } from "../../hooks/useBranchData";
import moment from "moment-timezone";
import { isBranchCurrentlyOpen } from "../Comman/Navbar";

function isOrderProcessable(prepTimeMs, closingTime, branchTimeZone) {
  const branchOrderTime = moment.tz(branchTimeZone);

  const [closingHours, closingMinutes, closingSeconds] = closingTime
    .split(":")
    .map(Number);
  const closingDate = branchOrderTime.clone().set({
    hour: closingHours,
    minute: closingMinutes,
    second: closingSeconds,
    millisecond: 0,
  });

  const completionTime = branchOrderTime
    .clone()
    .add(prepTimeMs, "milliseconds");

  return completionTime.isSameOrBefore(closingDate);
}

const OrderSummary = () => {
  const {
    items,
    orderType,
    setOrderType,
    deliveryTime,
    setDeliveryTime,
    selectedDateTime,
    setSelectedDateTime,
    updateItem,
    selectedTip,
    setSelectedTip,
    updateQuantity,
    orderCalculation,
    isCalculating,
    paymentMethod,
    // selectedAddress,
    placeOrder,
  } = useCart();

  const navigate = useNavigate();
  const [loading, setIsLoading] = useState(false);

  const today = new Date()
    .toLocaleString("en-US", { weekday: "short" })
    .toLowerCase();
  const schedule = JSON.parse(localStorage.getItem("branch_schedule"));
  const { branchDetails } = useBranchData(2, 3);
  const { close_time } = schedule?.find((day) => day.day === today) || {};

  const branchTimeZone = branchDetails?.branch_details[0]?.time_zone;

  const tookLargestTimeToCook =
    items.length > 0
      ? findLargestTimestamp(items, "item_preparation_time")
      : 1800000; // Default to 30 minutes if no items

  // ! Example
  // const condition =
  //   !isOrderProcessable(
  //     1800000, // 30 minutes in milliseconds
  //     "00:55:34", // Branch closing time
  //     "Asia/Kolkata" // Branch time zone
  //   ) && !isBranchCurrentlyOpen(schedule);

  const condition =
    !isOrderProcessable(
      tookLargestTimeToCook,
      close_time,
      branchTimeZone || "America/New_York"
    ) && isBranchCurrentlyOpen(schedule);

  useEffect(() => {
    if (!condition) {
      setDeliveryTime("Later");
    }
  }, []);

  const isOrderEnabled = () => {
    return paymentMethod;
  };

  const prepareOrderPayload = (orderData) => {
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails")) || {};
    const userName = `${userDetails.first_name} ${userDetails.last_name}`;
    console.log(orderData);
    console.log(orderData.items[0].restaurant_id);
    function convertNullToEmptyString(value) {
      return value === null || value === undefined ? "" : value;
    }

    return {
      restaurant_id: orderData.items[0]?.restaurant_id || 3,
      branch_id: orderData.items[0]?.branch_id || 5,
      user_id: String(userDetails.user_id || 14),
      user_name: convertNullToEmptyString(userName),
      street_1: convertNullToEmptyString(orderData.selectedAddress?.street_1),
      landmark: convertNullToEmptyString(orderData.selectedAddress?.landmark),
      city: convertNullToEmptyString(orderData.selectedAddress?.city_name),
      state: convertNullToEmptyString(orderData.selectedAddress?.state_name),
      phone_number: convertNullToEmptyString(
        orderData.selectedAddress?.mobile_number
      ),
      customer_notes: convertNullToEmptyString(
        orderData.deliveryInstructions?.join(", ")
      ),
      pincode: convertNullToEmptyString(orderData.selectedAddress?.pincode),
      street_2: convertNullToEmptyString(orderData.selectedAddress?.street_2),
      order_item: orderData.items.map((item) => ({
        item_id: String(item.item_id),
        special_notes: "",
        is_price_applicable: 1,
        quantity: String(item.quantity),
        order_items_step: item.steps?.length
          ? item.steps.map((step) => ({
              session_id: "ABC1234",
              step_id: String(convertNullToEmptyString(step.step_id)),
              step_name: convertNullToEmptyString(step.step_name),
              branch_extra_ingredient_category_steps_item_id: String(
                convertNullToEmptyString(
                  step.branch_extra_ingredient_category_steps_item_id
                )
              ),
              branch_extra_ingredient_price_for_parent_item_id: String(
                convertNullToEmptyString(
                  step.branch_extra_ingredient_price_for_parent_item_id
                )
              ),
              extra_ingredient_name: convertNullToEmptyString(
                step.extra_ingredient_name
              ),
              is_price_applicable: String(
                convertNullToEmptyString(step.is_price_applicable)
              ),
              price: String(convertNullToEmptyString(step.price)),
              quantity: String(convertNullToEmptyString(step.quantity || "1")),
              terminal_id: "1",
              price_type: "0",
              is_quantity_applicable: String(
                convertNullToEmptyString(step.is_quantity_applicable)
              ),
              quantity_price: String(
                convertNullToEmptyString(step.quantity_price)
              ),
            }))
          : [],
      })),
      session_id: "ABC1234",
      total_tips_amount: String(
        convertNullToEmptyString(orderData.selectedTip?.amount || "0")
      ),
      order_type: orderData.orderType === "Delivery" ? "2" : "1",
      user_delivery_latitude: String(
        convertNullToEmptyString(orderData?.selectedAddress?.latitude)
      ),
      user_delivery_longitude: String(
        convertNullToEmptyString(orderData?.selectedAddress?.longitude)
      ),
      delivery_charges_amount_or_percent: "",
      delivery_charges_value: "",
      delivery_total_charges: "",
      packaging_charges_amount_or_percent: "",
      packaging_charges_value: "",
      packaging_total_charges: "",
      customer_notes: convertNullToEmptyString(
        orderData.deliveryInstructions?.join(", ")
      ),
    };
  };

  const handlePlaceOrder = async () => {
    try {
      setIsLoading(true);
      const orderData = placeOrder();

      if (orderData) {
        const placeOrderPayload = prepareOrderPayload(orderData);

        const token = sessionStorage.getItem("token");

        const placeOrderResponse = await axios.post(
          "https://sandbox.vovpos.com:3002/web/placeOrder",
          placeOrderPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/order-placed", {
          state: {
            orderDetails: orderData,
            orderId: placeOrderResponse.data.RESULT.order_id,
          },
        });
        if (placeOrderResponse.data.STATUS === "1") {
          const paymentPayload = {
            restaurant_id: String(orderData.selectedAddress.restaurant_id || 3),
            branch_id: String(orderData.selectedAddress.branch_id || 5),
            order_id: String(placeOrderResponse.data.RESULT.order_id),
            session_id: "ABC1234",
            master_payment_id: String(
              orderData.paymentMethod.master_payment_id
            ),
            branch_payment_id: String(
              orderData.paymentMethod.branch_payment_id
            ),
          };
          console.log(orderData);
          const paymentResponse = await axios.post(
            "https://sandbox.vovpos.com:3002/web/orderPayment",
            paymentPayload,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Payment processed:", paymentResponse.data);
        }
      }
    } catch (error) {
      console.error("Order placement error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (cartItemId) => {
    // Set quantity to 0 to remove the item
    updateQuantity(cartItemId, 0);
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
      style={{ maxHeight: "calc(100vh - 150px)", minWidth: "100%" }}
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
            updateItem={updateItem}
            removeItem={handleRemoveItem}
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
