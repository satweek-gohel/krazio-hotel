import React from "react";
import { Clock } from "lucide-react";

const MenuCard = ({
  foodName,
  imageSrc,
  time,
  price,
  onAddClick,
  disabled,
}) => {
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
          {/* <div className="flex items-center gap-1">
            <span className="text-sm">{rating}</span>
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div> */}
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
          <button
            className={`px-4 sm:px-10 py-2 rounded-md ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-red-600 active:bg-red-700"
            } text-white text-sm transition-colors duration-200`}
            onClick={(e) => {
              e.stopPropagation();
              if (!disabled) {
                onAddClick();
              }
            }}
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
