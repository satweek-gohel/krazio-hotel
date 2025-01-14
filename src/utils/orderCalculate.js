export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

const generateRandomId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  const randomLetters = Array.from({ length: 3 }, () =>
    letters.charAt(Math.floor(Math.random() * letters.length))
  ).join("");

  const randomNumbers = Array.from({ length: 4 }, () =>
    numbers.charAt(Math.floor(Math.random() * numbers.length))
  ).join("");

  return `${randomLetters}${randomNumbers}`;
};

export const prepareOrderPayload = (items, selectedTip, orderType) => {
  return {
    restaurant_id: 2,
    branch_id: 3,
    order_item: items.map((item) => ({
      item_id: item.id,
      is_price_applicable: 1,
      quantity: item.quantity,
      order_items_step:
        item.order_items_step?.map((topping) => {
          const id = generateRandomId();
          return {
            ...topping,
            session_id: id,
            step_id: topping.step_id,
            is_price_applicable: topping.is_price_applicable,
            price: topping.price || 0,
            quantity: topping.quantity,
            extra_ingredient_category_step_id:
              topping.extra_ingredient_category_step_id,
            extra_ingredient_parent_category_step_id:
              topping.extra_ingredient_parent_category_step_id,
          };
        }) || [],
    })),
    total_tips_amount: selectedTip || 0,
    order_type: orderType === "Delivery" ? 2 : 1,
  };
};
