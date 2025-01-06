import { useState, useEffect } from "react";
import { X, Plus, Minus, ShoppingCart, Calendar } from "lucide-react";
import AddressStep from "./AddressStep";
import PaymentStep from "./PaymentStep";
import ConfirmedStep from "./ConfirmedStep";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const { isOpen, items, toggleCart, updateQuantity, totalPrice, totalItems } =
    useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderType, setOrderType] = useState("Delivery");
  const [deliveryTime, setDeliveryTime] = useState("Now");
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedTip, setSelectedTip] = useState(null);

  // Reset step when cart is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  // Reset step when items change (new items added)
  useEffect(() => {
    if (currentStep === 4) {
      setCurrentStep(1);
    }
  }, [items]);

  const VegIcon = () => (
    <div className="w-4 h-4 border border-green-600 flex items-center justify-center rounded">
      <div className="w-2 h-2 rounded-full bg-green-600"></div>
    </div>
  );

  const NonVegIcon = () => (
    <div className="w-4 h-4 border border-red-600 flex items-center justify-center rounded">
      <div className="w-2 h-2 rounded-full bg-red-600"></div>
    </div>
  );

  if (!isOpen) return null;

  const handleDeliveryTimeChange = (type) => {
    setDeliveryTime(type);

    if (type === "Now") {
      setSelectedDateTime("");
    }
  };

  const handleOrderTypeChange = (type) => {
    setOrderType(type);
    // Reset delivery time when switching order type
    setDeliveryTime("Now");
    setSelectedDateTime("");
  };

  const deliveryFee = orderType === "Delivery" ? 5.99 : 0;
  const tipAmount = selectedTip || 0;
  const total = totalPrice + deliveryFee + tipAmount;

  const CartItem = ({ item }) => {
    const [itemNote, setItemNote] = useState(item.note || "");

    const handleNoteChange = (e) => {
      setItemNote(e.target.value);
    };

    return (
      <div className="space-y-3 rounded border border-gray-300 p-1">
        <div className="grid grid-cols-4 items-center gap-4 p-3 border-b dashed ">
          <div className="col-span-2 flex flex-col">
            <span className="font-bold text-left flex items-center gap-2 text-sm">
              {item.isVeg ? <VegIcon /> : <NonVegIcon />}
              {item.item_name}
            </span>
            {item.selectedToppings?.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                {item.selectedToppings.join(", ")}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => {}}
                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700"
              >
                <img src="/customize.svg" alt="" className="w-3 h-3" />
                Customize
              </button>
            </div>
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-gray-100 border rounded p-1">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity === 1}
                className={`p-1 rounded-full text-white ${
                  item.quantity === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 bg-red-600 rounded-full text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="col-span-1 text-right">
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
            {item.selectedToppings?.length > 0 && (
              <p className="text-sm text-gray-500">
                +$
                {(item.selectedToppings.length * 1.5 * item.quantity).toFixed(
                  2
                )}
              </p>
            )}
          </div>
        </div>

        <div className="relative px-3">
          <div className="absolute left-4 top-3 pointer-events-none">
            <img
              src="/clipboard.svg"
              alt=""
              className={`w-5 h-5 text-gray-400 ${
                itemNote ? "opacity-100" : "opacity-50"
              }`}
            />
          </div>
          <input
            type="text"
            value={itemNote}
            onChange={handleNoteChange}
            placeholder={!itemNote ? "Add Your Note..." : ""}
            className="w-full p-2 pl-10 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
            rows={2}
          />
        </div>
      </div>
    );
  };

  const CartContent = () => (
    <>
      <div className="px-4 mx-3 py-1 space-y-4 border rounded">
        <div className="mb-0 flex justify-between p-3 rounded items-center border-b">
          <p className="text-black text-sm font-semibold">Order Type</p>
          <div className="flex gap-3">
            <button
              onClick={() => handleOrderTypeChange("Delivery")}
              className={`px-4 py-2 rounded text-xs transition-colors duration-200 md:w-[80px] ${
                orderType === "Delivery"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Delivery
            </button>
            <button
              onClick={() => handleOrderTypeChange("Pick Up")}
              className={`px-4 py-2 rounded text-xs transition-colors duration-200 md:w-[80px] ${
                orderType === "Pick Up"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Pick Up
            </button>
          </div>
        </div>

        {orderType === "Delivery" && (
          <div className=" flex justify-between items-center p-3 rounded">
            <p className="text-black text-sm font-semibold mb-2">
              Food Delivery Time
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeliveryTimeChange("Now")}
                className={`px-4 py-2 rounded text-xs transition-colors duration-200 w-[80px] ${
                  deliveryTime === "Now"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Now
              </button>
              <button
                onClick={() => handleDeliveryTimeChange("Later")}
                className={`px-4 py-2 rounded text-xs transition-colors duration-200 w-[80px] ${
                  deliveryTime === "Later"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Later
              </button>
            </div>
          </div>
        )}

        {deliveryTime === "Later" && orderType === "Delivery" && (
          <div className=" bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-6">
              <div className="relative mb-6 group">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-primary/50 group-focus-within:text-primary transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>

                <input
                  type="datetime-local"
                  value={selectedDateTime}
                  onChange={(e) => setSelectedDateTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-primary/5 border-2 border-primary/10 
                          rounded-lg text-primary placeholder-primary/50
                          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                          transition-all duration-200 ease-in-out
                          hover:border-primary/30"
                  min={new Date().toISOString().slice(0, 16)}
                  placeholder="Select date and time"
                />

                <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
              </div>

              {selectedDateTime && (
                <p className="text-primary/70 text-sm">
                  Selected: {new Date(selectedDateTime).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${JSON.stringify(item.selectedToppings)}`}
                item={item}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mb-6 border p-3 mx-3 mt-2 rounded">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=50&h=50&fit=crop"
            alt="Tip"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm text-gray-600">
            Show your support with a small tip.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 text-xs">
            $20
          </button>
          <button className="flex-1 py-2 bg-red-600 text-white rounded-lg text-xs">
            $40
          </button>
          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 text-xs">
            $60
          </button>
          <button className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-700 text-xs">
            Other
          </button>
        </div>
      </div>

      <div className="border-t px-4 py-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-black">
            <span className="font-semibold">Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          {orderType === "Delivery" && (
            <div className="flex justify-between text-sm text-black">
              <span className="font-semibold">Tax</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
          )}
          {selectedTip > 0 && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tip</span>
              <span>${selectedTip.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium pt-2 border-t border-gray-100">
            <span className="font-bold">Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          onClick={() => {
            toggleCart();
            setCurrentStep(1);
            navigate("/checkout");
          }}
          disabled={items.length === 0}
        >
          Checkout
        </button>
      </div>
    </>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CartContent />;
      case 2:
        return <AddressStep onNext={() => setCurrentStep(3)} />;
      case 3:
        return <PaymentStep onNext={() => setCurrentStep(4)} />;
      case 4:
        return <ConfirmedStep />;
      default:
        return <CartContent />;
    }
  };

  const handleClose = () => {
    toggleCart();
    setCurrentStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full ">
        <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 bg-gray-50">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-black" />
                <h2 className="text-lg font-medium text-black">
                  {currentStep === 4
                    ? "Order Confirmed"
                    : `Order Summary (${totalItems})`}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="text-white bg-black p-1 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
