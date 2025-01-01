export const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  export const prepareOrderPayload = (items, selectedTip, orderType) => {
    return {
      restaurant_id: 2,
      branch_id: 3,
      order_item: items.map(item => ({
        item_id: item.id,
        is_price_applicable: 1,
        quantity: item.quantity,
        order_items_step: item.order_items_step?.map(topping => ({
          step_id: topping.step_id,
          is_price_applicable: topping.is_price_applicable,
          price: topping.price || 0,
          quantity: topping.quantity,
          extra_ingredient_category_step_id: topping.extra_ingredient_category_step_id,
          extra_ingredient_parent_category_step_id: topping.extra_ingredient_parent_category_step_id
        })) || []
      })),
      total_tips_amount: selectedTip || 0,
      order_type: orderType === 'Delivery' ? 2 : 1
    };
  };