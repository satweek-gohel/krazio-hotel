export const createItemKey = (item, customizations) => {
  const keyData = {
    item_id: item.item_id,
    restaurant_id: item.restaurant_id,
    branch_id: item.branch_id,
    size: customizations.size,
    sauces: Array.isArray(customizations.sauces)
      ? [...customizations.sauces].sort().join(",")
      : customizations.sauces,
    taste: customizations.taste,
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
      quantity: customizations.quantity || 1,
    },
  };
};

export const calculateItemTotal = (item) => {
  const basePrice = Number(item.price);
  const quantity = item.quantity || item.customizations?.quantity || 1;

  return basePrice * quantity;
};

export function formatTime(timeString) {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${period}`;
}

export function timeStringToMilliseconds(timeString) {
  if (!timeString || typeof timeString !== "string") {
    console.error("Invalid time string format. Expected 'HH:MM:SS'");
  }

  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    console.error(
      "Time string must contain valid numbers in 'HH:MM:SS' format"
    );
  }

  return (hours * 60 * 60 + minutes * 60 + seconds) * 1000;
}

export function findLargestTimestamp(objects, key) {
  if (!Array.isArray(objects) || objects.length === 0) {
    console.error("Input must be a non-empty array of objects.");
  }

  if (typeof key !== "string") {
    console.error("Key must be a string representing the timestamp property.");
  }

  const largestTimestamp = objects.reduce((max, obj) => {
    if (obj[key] === undefined) {
      console.error(`Key '${key}' does not exist in one or more objects.`);
    }
    const timestamp = new Date(obj[key]).getTime();
    return Math.max(max, timestamp);
  }, -Infinity);

  return largestTimestamp ? new Date(largestTimestamp) : 1800000;
}

export const generateCartItemId = (item) => {
  const customizations = {
    size: item.selectedSize || item.size,
    sauces: item.selectedSauces || item.sauces,
    taste: item.selectedTaste || item.taste,
    toppings: item.selectedToppings || [],
    steps: item.order_items_step || [],
  };

  if (Array.isArray(customizations.sauces)) {
    customizations.sauces.sort();
  }
  if (Array.isArray(customizations.toppings)) {
    customizations.toppings.sort();
  }
  if (Array.isArray(customizations.steps)) {
    customizations.steps.sort((a, b) => a.step_name.localeCompare(b.step_name));
  }

  return `${item.id}-${JSON.stringify(customizations)}`;
};
