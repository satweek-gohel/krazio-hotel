import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import { getItemSteps } from "../../services/api/itemService";
import SizeSection from "./SizeSection";
import SauceSection from "./SauceSection";
import TasteSection from "./TasteSection";
import ToppingsSection from "./ToppingsSection";
import MainQuantitySelector from "./MainQuantitySelector";
import {
  calculateSizePrice,
  calculateSaucesPrice,
  calculateTastePrice,
  calculateToppingsPrice,
  calculateTotalPrice,
} from "./priceCalculator";

const ItemCustomizationModal = ({ item, isOpen, onClose, onAddToCart }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for selections
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedTaste, setSelectedTaste] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!item?.item_id) return;

      setLoading(true);
      try {
        const data = await getItemSteps(
          item.restaurant_id,
          item.branch_id,
          item.item_id
        );
        setItemDetails(data);

        const sizeStep = data?.step_details?.find(
          (step) => step.display_name === "Size"
        );
        const defaultSize = sizeStep?.category_steps_item?.find(
          (size) => size.is_auto_selected_item === "1"
        );
        setSelectedSize(
          defaultSize?.extra_ingredient_name ||
            sizeStep?.category_steps_item?.[0]?.extra_ingredient_name ||
            ""
        );

        setSelectedToppings([]);
      } catch (err) {
        setError("Failed to load item details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchItemDetails();
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [item, isOpen]);

  useEffect(() => {
    setSelectedToppings([]);
  }, [selectedSize]);

  const prepareOrderItemsSteps = () => {
    const orderItemsStep = [];
    
    const sessionId = "SESSION_" + Math.random().toString(36).substr(2, 9);
    const terminalId = "1";

    // Add size selection
    if (selectedSize) {
      const sizeStep = itemDetails?.step_details?.find(
        (step) => step.display_name === "Size"
      );
      const selectedSizeItem = sizeStep?.category_steps_item?.find(
        (size) => size.extra_ingredient_name === selectedSize
      );

      console.log(selectedSizeItem);

      if (selectedSizeItem) {
        orderItemsStep.push({
          session_id: sessionId,
          step_id: selectedSizeItem.branch_extra_ingredient_category_steps_id,
          step_name: sizeStep.display_name,
          branch_extra_ingredient_category_steps_item_id:selectedSizeItem.branch_extra_ingredient_category_steps_item_id,
          extra_ingredient_name: selectedSizeItem.extra_ingredient_name,
          is_price_applicable: selectedSizeItem.is_price_applicable,
          branch_extra_ingredient_price_for_parent_item_id: selectedSizeItem.parent_branch_extra_ingredient_category_steps_item,
          price: selectedSizeItem.price,
          quantity: quantity.toString(),
          terminal_id: terminalId,
          price_type: selectedSizeItem.price_type || "0",
          is_quantity_applicable:selectedSizeItem.is_quantity_applicable || "0",
          quantity_price: selectedSizeItem.quantity_price || "0",
        });

        
        console.log(selectedToppings);
        
        // Add selected toppings
        selectedToppings.forEach((topping) => {
          const toppingItem = selectedSizeItem.price_for_parent_item.find(
            (item) => item.extra_ingredient_name === topping.name
          );
          if (toppingItem) {
            orderItemsStep.push({
              session_id: sessionId,
              step_id: toppingItem.branch_extra_ingredient_category_steps,
              step_name: "Toppings",
              branch_extra_ingredient_category_steps_item_id:
                toppingItem.branch_extra_ingredient_category_steps_item,
              branch_extra_ingredient_price_for_parent_item_id:
                toppingItem.branch_extra_ingredient_price_for_parent_item,
              extra_ingredient_name: toppingItem.extra_ingredient_name,
              is_price_applicable: toppingItem.is_price_applicable,
              price: toppingItem.price,
              quantity: topping.quantity.toString(),
              terminal_id: terminalId,
              price_type: toppingItem.price_type || "0",
              is_quantity_applicable: toppingItem.is_quantity_applicable || "0",
              quantity_price: toppingItem.quantity_price || "0",
            });
          }
        });
      }
    }
 
    // Add sauce selections
    selectedSauces.forEach((sauce) => {
      const sauceStep = itemDetails?.step_details?.find(
        (step) => step.display_name === "Sauces"
      );
      const sauceItem = sauceStep?.category_steps_item?.find(
        (s) => s.extra_ingredient_name === sauce.name
      );
      console.log(sauceItem);
      if (sauceItem) {
        orderItemsStep.push({
          session_id: sessionId,
          step_id: sauceItem.branch_extra_ingredient_category_steps_id,
          step_name: sauceStep.display_name,
          branch_extra_ingredient_category_steps_item_id:
            sauceItem.branch_extra_ingredient_category_steps_item_id,
          branch_extra_ingredient_price_for_parent_item_id: sauceItem.parent_branch_extra_ingredient_category_steps_item,
          extra_ingredient_name: sauceItem.extra_ingredient_name,
          is_price_applicable: sauceItem.is_price_applicable,
          price: sauceItem.price,
          quantity: sauce.quantity.toString(),
          terminal_id: terminalId,
          price_type: sauceItem.price_type || "0",
          is_quantity_applicable: sauceItem.is_quantity_applicable || "0",
          quantity_price: sauceItem.quantity_price || "0",
        });
      }
    });

    console.log(selectedSauces);


    // Add taste selection
    if (selectedTaste) {
      const tasteStep = itemDetails?.step_details?.find(
        (step) => step.display_name === "Taste"
      );
      const tasteItem = tasteStep?.category_steps_item?.find(
        (taste) => taste.extra_ingredient_name === selectedTaste
      );
      if (tasteItem) {
        orderItemsStep.push({
          session_id: sessionId,
          step_id: tasteItem.branch_extra_ingredient_category_steps,
          step_name: tasteStep.display_name,
          branch_extra_ingredient_category_steps_item_id:
            tasteItem.branch_extra_ingredient_category_steps_item,
          branch_extra_ingredient_price_for_parent_item_id: "0",
          extra_ingredient_name: tasteItem.extra_ingredient_name,
          is_price_applicable: tasteItem.is_price_applicable,
          price: tasteItem.price,
          quantity: "1",
          terminal_id: terminalId,
          price_type: tasteItem.price_type || "0",
          is_quantity_applicable: tasteItem.is_quantity_applicable || "0",
          quantity_price: tasteItem.quantity_price || "0",
        });
      }
    }

    return orderItemsStep;
    
  };

  

  const handleSubmit = () => {
    const orderItemsStep = prepareOrderItemsSteps();
    console.log(orderItemsStep);
    onAddToCart({
      ...item,
      ...itemDetails,
      size: selectedSize,
      quantity,
      sauces: selectedSauces,
      taste: selectedTaste,
      toppings: selectedToppings,
      totalPrice: calculateTotalPrice(
        itemDetails?.price || 0,
        calculateSizePrice(
          itemDetails?.step_details?.find(
            (step) => step.display_name === "Size"
          ),
          selectedSize
        ),
        calculateSaucesPrice(
          itemDetails?.step_details?.find(
            (step) => step.display_name === "Sauces"
          ),
          selectedSauces
        ),
        calculateTastePrice(
          itemDetails?.step_details?.find(
            (step) => step.display_name === "Taste"
          ),
          selectedTaste
        ),
        calculateToppingsPrice(
          itemDetails?.step_details?.find(
            (step) => step.display_name === "Size"
          ),
          selectedSize,
          selectedToppings
        ),
        quantity
      ),
      order_items_step: orderItemsStep,
    });
    onClose();
  };

  if (!isOpen) return null;
  if (loading)
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-6">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );

  const sizeStep = itemDetails?.step_details?.find(
    (step) => step.display_name === "Size"
  );
  const sauceStep = itemDetails?.step_details?.find(
    (step) => step.display_name === "Sauces"
  );
  const tasteStep = itemDetails?.step_details?.find(
    (step) => step.display_name === "Taste"
  );

  const basePrice = itemDetails?.price || 0;
  const sizePrice = calculateSizePrice(sizeStep, selectedSize);
  const saucesPrice = calculateSaucesPrice(sauceStep, selectedSauces);
  const tastePrice = calculateTastePrice(tasteStep, selectedTaste);
  const toppingsPrice = calculateToppingsPrice(
    sizeStep,
    selectedSize,
    selectedToppings
  );
  const totalPrice = calculateTotalPrice(
    basePrice,
    sizePrice,
    saucesPrice,
    tastePrice,
    toppingsPrice,
    quantity
  );

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col relative">
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

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <SizeSection
            sizeStep={sizeStep}
            selectedSize={selectedSize}
            onSizeSelect={setSelectedSize}
          />

          <ToppingsSection
            selectedSize={selectedSize}
            sizeStep={sizeStep}
            selectedToppings={selectedToppings}
            onToppingUpdate={setSelectedToppings}
          />

          <SauceSection
            sauceStep={sauceStep}
            selectedSauces={selectedSauces}
            onSauceUpdate={setSelectedSauces}
          />

          <TasteSection
            tasteStep={tasteStep}
            selectedTaste={selectedTaste}
            onTasteSelect={setSelectedTaste}
          />
        </div>

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
            {toppingsPrice > 0 && (
              <div className="flex justify-between">
                <span>Toppings:</span>
                <span>${toppingsPrice.toFixed(2)}</span>
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
          <div className="container flex justify-between items-center gap-4">
            <MainQuantitySelector
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-4 bg-primary text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Add To Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ItemCustomizationModal.propTypes = {
  item: PropTypes.shape({
    item_id: PropTypes.string,
    item_name: PropTypes.string,
    restaurant_id: PropTypes.string,
    branch_id: PropTypes.string,
    price: PropTypes.number,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ItemCustomizationModal;
