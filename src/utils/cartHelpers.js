export const createItemKey = (item, customizations) => {
    // Create a unique key that includes all relevant item and customization details
    const keyData = {
      item_id: item.item_id,
      restaurant_id: item.restaurant_id,
      branch_id: item.branch_id,
      size: customizations.size,
      sauces: Array.isArray(customizations.sauces) 
        ? [...customizations.sauces].sort().join(',') 
        : customizations.sauces,
      taste: customizations.taste
    };
    
    return JSON.stringify(keyData);
  };
  
  export const formatCartItem = (item, customizations) => {
    return {
      item_id: item.item_id,
      item_name: item.item_name,
      item_image: item.item_image,
      price: Number(item.price),
      restaurant_id: item.restaurant_id,
      branch_id: item.branch_id,
      category_id: item.category_id,
      rating: item.rating,
      preparation_time: item.preparation_time,
      customizations: {
        size: customizations.size,
        sauces: customizations.sauces,
        taste: customizations.taste,
        quantity: customizations.quantity || 1
      }
    };
  };
  
  export const calculateItemTotal = (item) => {
    const basePrice = Number(item.price);
    const quantity = item.quantity || item.customizations?.quantity || 1;
    
    // Add additional price calculations for customizations if needed
    // const sizePrice = calculateSizePrice(item.customizations.size);
    // const saucesPrice = calculateSaucesPrice(item.customizations.sauces);
    
    return basePrice * quantity;
  };