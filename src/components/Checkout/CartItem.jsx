import React, { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "../../utils/orderCalculate";
import { generateCartItemId } from "../../utils/cartHelpers";
import ItemCustomizationModal from "../ItemCustomization/ItemCustomizationModal";

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

const CartItem = ({ item, updateQuantity, updateItem, removeItem }) => {
  const cartItemId = generateCartItemId(item);
  const [itemNote, setItemNote] = useState(item.note || "");
  const [isCustomizing, setIsCustomizing] = useState(false);

  const groupedSteps =
    item.order_items_step?.reduce((acc, step) => {
      if (!acc[step.step_name]) {
        acc[step.step_name] = [];
      }
      acc[step.step_name].push(step);
      return acc;
    }, {}) || {};

  const handleCustomize = () => {
    setIsCustomizing(true);
  };

  const handleCustomizationComplete = (customizedItem) => {
    updateItem(cartItemId, {
      ...item,
      ...customizedItem,
      selectedSize: customizedItem.size,
      selectedSauces: customizedItem.sauces,
      selectedTaste: customizedItem.taste,
      selectedToppings: customizedItem.toppings,
      price: customizedItem.totalPrice / customizedItem.quantity,
      order_items_step: customizedItem.order_items_step,
    });
    setIsCustomizing(false);
  };

  const handleRemoveItem = () => {
    removeItem(cartItemId);
  };

  const renderStepDetails = () => {
    return Object.entries(groupedSteps).map(([stepName, steps]) => (
      <div key={stepName} className="mt-1">
        <span className="text-sm text-black font-semibold">{stepName}: </span>
        <span className="text-sm text-black">
          {steps.map((step, index) => (
            <span key={index}>
              {step.extra_ingredient_name}
              {index < steps.length - 1 ? ", " : ""}
            </span>
          ))}
        </span>
      </div>
    ));
  };

  const calculateTotalPrice = () => {
    let basePrice = item.price * item.quantity;
    
    if (item.selectedToppings?.length > 0) {
      const toppingsPrice = item.selectedToppings.length * 1.5 * item.quantity;
      basePrice += toppingsPrice;
    }
    
    return basePrice;
  };

  return (
    <>
      <div className="space-y-3 rounded border border-gray-300 p-1 relative">
        {/* Remove button */}
        <button
          onClick={handleRemoveItem}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
          aria-label="Remove item"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-4 items-start gap-4 p-3 border-b dashed">
          <div className="col-span-2 flex flex-col">
            <span className="font-bold text-left flex items-center gap-2 text-sm">
              {item.food_type === 1 || item.food_type === 4 ? <VegIcon /> : item.food_type === 2 ? <NonVegIcon /> : null}
              {item.item_name}
            </span>

            <div className="flex flex-col gap-1 mt-2">
              {item.is_extra_ingradient_available === "1" && (
                <button 
                  onClick={handleCustomize}
                  className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 w-fit"
                >
                  <img src="/customize.svg" alt="" className="w-3 h-3" />
                  Customize
                </button>
              )}
              {item.order_items_step && renderStepDetails()}
            </div>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-gray-100 border rounded p-1">
              <button
                onClick={() => updateQuantity(cartItemId, item.quantity - 1)}
                className={`p-1 rounded-full text-white ${
                  item.quantity === 1 ? "bg-gray-400" : "bg-red-600"
                }`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(cartItemId, item.quantity + 1)}
                className="p-1 bg-red-600 rounded-full text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="col-span-1 text-right">
            <p className="font-medium">{formatPrice(calculateTotalPrice())}</p>
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
            onChange={(e) => setItemNote(e.target.value)}
            placeholder={!itemNote ? "Add Your Note..." : ""}
            className="w-full p-2 pl-10 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {isCustomizing && (
        <ItemCustomizationModal
          item={{
            ...item,
            size: item.selectedSize,
            sauces: item.selectedSauces,
            taste: item.selectedTaste,
            toppings: item.selectedToppings,
          }}
          isOpen={isCustomizing}
          onClose={() => setIsCustomizing(false)}
          onAddToCart={handleCustomizationComplete}
        />
      )}
    </>
  );
};

export default CartItem;