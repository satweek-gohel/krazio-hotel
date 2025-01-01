import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { formatPrice } from '../../utils/orderCalculate';


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

const CartItem = ({ item, updateQuantity }) => {
  const [itemNote, setItemNote] = useState(item.note || '');

  return (
    <div className="space-y-3 rounded border border-gray-300 p-1">
      <div className="grid grid-cols-4 items-center gap-4 p-3 border-b dashed">
        <div className="col-span-2 flex flex-col">
          <span className="font-bold text-left flex items-center gap-2 text-sm">
            {item.isVeg ? <VegIcon /> : <NonVegIcon />}
            {item.item_name}
          </span>
          {item.selectedToppings?.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              {item.selectedToppings.join(', ')}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <button className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700">
              <img src="/customize.svg" alt="" className="w-3 h-3" />
              Customize
            </button>
          </div>
        </div>
        
        <div className="col-span-1 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-gray-100 border rounded p-1">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
             
              className={`p-1 rounded-full text-white ${
                item.quantity === 1 
                  ? 'bg-gray-400' 
                  : 'bg-red-600'
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
          <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
          {item.selectedToppings?.length > 0 && (
            <p className="text-sm text-gray-500">
              +{formatPrice(item.selectedToppings.length * 1.5 * item.quantity)}
            </p>
          )}
        </div>
      </div>
      
      <div className="relative px-3">
        <div className="absolute left-4 top-3 pointer-events-none">
          <img 
            src="/clipboard.svg" 
            alt="" 
            className={`w-5 h-5 text-gray-400 ${itemNote ? 'opacity-100' : 'opacity-50'}`} 
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
  );
};

export default CartItem;