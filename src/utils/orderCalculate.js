import { json } from "react-router-dom";

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
        order_items_step: item.order_items_step?.map(step => ({
          session_id: step.session_id,
          step_name: step.step_name,
          branch_extra_ingredient_category_steps_item_id: JSON.stringify(step.branch_extra_ingredient_category_steps_item_id) ,
          branch_extra_ingredient_price_for_parent_item_id: step.branch_extra_ingredient_price_for_parent_item_id ,
          extra_ingredient_name: step.extra_ingredient_name,
          is_price_applicable: step.is_price_applicable,
          step_id: JSON.stringify(step.step_id),
          price: step.price,
          quantity: step.quantity,
          terminal_id: step.terminal_id,
          price_type: step.price_type,
          is_quantity_applicable: step.is_quantity_applicable,
          quantity_price: step.quantity_price
        })) || []
      })),
      total_tips_amount: selectedTip || 0,
      order_type: orderType === 'Delivery' ? 2 : 1,
    };
  };