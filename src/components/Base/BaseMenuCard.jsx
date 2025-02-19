// MenuCard.jsx
import React from "react";
import { Clock } from "lucide-react";

const MenuCard = ({
  foodName,
  imageSrc,
  time,
  price,
  onAddClick,
  disabled,
  quantity = 0,
  onUpdateQuantity,
  is_extra_ingradient_available
}) => {
  const handleQuantityChange = (change, e) => {
    e.stopPropagation();
    const newQuantity = quantity + change;
    if (newQuantity >= 0) {
      onUpdateQuantity(newQuantity);
    }
  };

  const renderAddButton = () => {
    if (disabled) {
      return (
        <button
          className="px-4 sm:px-10 py-2 rounded-md bg-gray-400 cursor-not-allowed text-white text-sm"
          disabled
        >
          Add
        </button>
      );
    }

    if (is_extra_ingradient_available === "1") {
      return (
        <button
          className="px-4 sm:px-10 py-2 rounded-md bg-primary hover:bg-red-600 active:bg-red-700 text-white text-sm transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            onAddClick();
          }}
        >
          Add
        </button>
      );
    }

    if (quantity > 0) {
      return (
        <div className="flex items-center gap-2 bg-primary rounded">
          <button
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-red-600"
            onClick={(e) => handleQuantityChange(-1, e)}
          >
            -
          </button>
          <span className="text-sm font-medium w-6 text-center text-white">{quantity}</span>
          <button
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-red-600"
            onClick={(e) => handleQuantityChange(1, e)}
          >
            +
          </button>
        </div>
      );
    }

    return (
      <button
        className="px-4 sm:px-10 py-2 rounded-md bg-primary hover:bg-red-600 active:bg-red-700 text-white text-sm transition-colors duration-200"
        onClick={(e) => {
          e.stopPropagation();
          onAddClick();
        }}
      >
        Add
      </button>
    );
  };

  return (
    <div className="max-w-sm rounded-lg p-1 overflow-hidden shadow-lg bg-white hover:shadow-xl border border-gray-300 transition-shadow duration-300">
      <div className="relative">
        <img
          src={imageSrc}
          alt={foodName}
          className="w-full h-48 object-cover p-1 rounded-lg"
          onError={(e) => {
            e.target.src = "/default-food.png";
          }}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold truncate">{foodName}</h3>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm text-gray-600">{time} Minutes</span>
        </div>

        <hr className="my-3 border-gray-200" />

        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">
            ${Number(price).toFixed(2)}
          </span>
          {renderAddButton()}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
