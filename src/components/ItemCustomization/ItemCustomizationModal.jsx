import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getItemSteps } from '../../services/api/itemService';
import SizeSection from './SizeSection';
import SauceSection from './SauceSection';
import TasteSection from './TasteSection';
import QuantitySection from './QuantitySection';
import {
  calculateSizePrice,
  calculateSaucesPrice,
  calculateTastePrice,
  calculateTotalPrice
} from './priceCalculator';

const ItemCustomizationModal = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for selections
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedTaste, setSelectedTaste] = useState('');

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!item?.item_id) return;
      
      setLoading(true);
      try {
        const data = await getItemSteps(item.restaurant_id, item.branch_id, item.item_id);
        setItemDetails(data);
        
        const sizeStep = data?.step_details?.find(step => step.display_name === "Size");
        const defaultSize = sizeStep?.category_steps_item?.find(size => size.is_auto_selected_item === "1");
        setSelectedSize(defaultSize?.extra_ingredient_name || sizeStep?.category_steps_item?.[0]?.extra_ingredient_name || '');
      } catch (err) {
        setError('Failed to load item details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchItemDetails();
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Re-enable body scrolling when modal closes
      document.body.style.overflow = 'unset';
    };
  }, [item, isOpen]);

  if (!isOpen) return null;
  if (loading) return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    </div>
  );
  if (error) return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6">
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );

  const sizeStep = itemDetails?.step_details?.find(step => step.display_name === "Size");
  const sauceStep = itemDetails?.step_details?.find(step => step.display_name === "Sauces");
  const tasteStep = itemDetails?.step_details?.find(step => step.display_name === "Taste");

  const basePrice = itemDetails?.price || 0;
  const sizePrice = calculateSizePrice(sizeStep, selectedSize);
  const saucesPrice = calculateSaucesPrice(sauceStep, selectedSauces);
  const tastePrice = calculateTastePrice(tasteStep, selectedTaste);
  const totalPrice = calculateTotalPrice(
    basePrice,
    sizePrice,
    saucesPrice,
    tastePrice,
    quantity
  );

  const handleSubmit = () => {
    onAddToCart({
      ...item,
      ...itemDetails,
      size: selectedSize,
      quantity,
      sauces: selectedSauces,
      taste: selectedTaste,
      totalPrice,
      itemBreakdown: {
        basePrice,
        sizePrice,
        saucesPrice,
        tastePrice,
        quantity
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col relative">
        {/* Header */}
        <div className="p-6 border-b">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">{item?.item_name}</h2>
          <p className="text-gray-600 mt-1">Customize Your {item?.item_name}</p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <SizeSection
            sizeStep={sizeStep}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          <SauceSection
            sauceStep={sauceStep}
            selectedSauces={selectedSauces}
            onSauceToggle={setSelectedSauces}
          />

          <TasteSection
            tasteStep={tasteStep}
            selectedTaste={selectedTaste}
            onTasteSelect={setSelectedTaste}
          />

          <QuantitySection
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
        </div>

        {/* Footer with Price Breakdown and Action Button */}
        <div className="border-t p-6 space-y-4 bg-white">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Base Price:</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            {sizePrice > 0 && (
              <div className="flex justify-between">
                <span>Size ({selectedSize}):</span>
                <span>${sizePrice.toFixed(2)}</span>
              </div>
            )}
            {saucesPrice > 0 && (
              <div className="flex justify-between">
                <span>Sauces:</span>
                <span>${saucesPrice.toFixed(2)}</span>
              </div>
            )}
            {tastePrice > 0 && (
              <div className="flex justify-between">
                <span>Taste ({selectedTaste}):</span>
                <span>${tastePrice.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Add To Order - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCustomizationModal;