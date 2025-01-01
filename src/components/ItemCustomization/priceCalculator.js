export const calculateSizePrice = (sizeStep, selectedSize) => {
  if (!sizeStep || !selectedSize) return 0;
  const sizeOption = sizeStep.category_steps_item?.find(
    (item) => item.extra_ingredient_name === selectedSize
  );
  return sizeOption?.price ? parseFloat(sizeOption.price) : 0;
};

export const calculateSaucesPrice = (sauceStep, selectedSauces) => {
  if (!sauceStep || !selectedSauces?.length) return 0;
  return selectedSauces.reduce((total, sauce) => {
    const sauceOption = sauceStep.category_steps_item?.find(
      (item) => item.extra_ingredient_name === sauce.name
    );
    return total + (sauceOption?.price ? parseFloat(sauceOption.price) * sauce.quantity : 0);
  }, 0);
};

export const calculateTastePrice = (tasteStep, selectedTaste) => {
  if (!tasteStep || !selectedTaste) return 0;
  const tasteOption = tasteStep.category_steps_item?.find(
    (item) => item.extra_ingredient_name === selectedTaste
  );
  return tasteOption?.price ? parseFloat(tasteOption.price) : 0;
};

export const calculateToppingsPrice = (sizeStep, selectedSize, selectedToppings) => {
  if (!sizeStep || !selectedSize || !selectedToppings?.length) return 0;
  
  const selectedSizeItem = sizeStep.category_steps_item.find(
    size => size.extra_ingredient_name === selectedSize
  );

  if (!selectedSizeItem?.price_for_parent_item) return 0;

  return selectedToppings.reduce((total, topping) => {
    const toppingItem = selectedSizeItem.price_for_parent_item.find(
      item => item.extra_ingredient_name === topping.name
    );
    return total + (toppingItem?.price ? parseFloat(toppingItem.price) * topping.quantity : 0);
  }, 0);
};

export const calculateTotalPrice = (
  basePrice,
  sizePrice,
  saucesPrice,
  tastePrice,
  toppingsPrice,
  quantity
) => {
  const unitPrice = parseFloat(basePrice || 0) + 
                   parseFloat(sizePrice || 0) + 
                   parseFloat(saucesPrice || 0) + 
                   parseFloat(tastePrice || 0) +
                   parseFloat(toppingsPrice || 0);
  return unitPrice * (quantity || 1);
};