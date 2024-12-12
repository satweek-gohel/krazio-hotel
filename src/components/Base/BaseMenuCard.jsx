import React from 'react';
import { Clock, Star } from 'lucide-react';

const MenuCard = ({
foodName,
imageSrc,
rating,
time,
price,
onAddClick,
disabled
}) => {
return (
<div className={`max-w-sm rounded-lg p-1 overflow-hidden shadow-lg bg-white`}>
{/* Food Image */}
<img
src={imageSrc || "/api/placeholder/400/200"}
alt={foodName}
className="w-full h-48 object-cover p-1 rounded-lg"
/>


  {/* Content Container */}
  <div className="p-4">
    {/* Name and Rating Row */}
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">{foodName}</h3>
      <div className="flex items-center gap-1">
        <span className="text-sm">{rating}</span>
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      </div>
    </div>
    
    {/* Time Row */}
    <div className="flex items-center gap-1 mb-2">
      <Clock className="w-4 h-4 text-primary" />
      <span className="text-sm text-gray-600">{time} Minutes</span>
    </div>
    
    {/* Divider */}
    <hr className="my-3 border-gray-200" />
    
    {/* Price and Add Button Row */}
    <div className="flex items-center justify-between">
      <span className="text-primary font-bold">{`$${price}`}</span>
      <button 
        className={`px-3 py-1 ${disabled ? 'bg-gray-400' : 'bg-primary'} text-white text-sm rounded-md ${disabled ? 'cursor-not-allowed' : 'hover:bg-red-600 transition-colors'}`}
        onClick={onAddClick}
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

