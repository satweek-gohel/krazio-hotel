import React, { createContext, useContext, useState, useEffect } from 'react';
import { prepareOrderPayload } from '../utils/orderCalculate';
import { calculateOrder } from '../services/api/orderCalculations';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem('cartOpen') === 'true');
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cartItems') || '[]'));
  const [orderType, setOrderType] = useState('Delivery');
  const [deliveryTime, setDeliveryTime] = useState('Now');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedTip, setSelectedTip] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [deliveryInstructions, setDeliveryInstructions] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderCalculation, setOrderCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartOpen', isOpen);
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  const updateOrderCalculation = async () => {
    if (items.length === 0) return;

    setIsCalculating(true);
    try {
      const payload = prepareOrderPayload(items, selectedTip, orderType);
      const result = await calculateOrder(payload);
      setOrderCalculation(result.RESULT);
    } catch (error) {
      console.error('Error updating order calculation:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    updateOrderCalculation();
  }, [items, selectedTip, orderType]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addItem = (item) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => 
        i.id === item.id && 
        i.selectedSize === item.size &&
        JSON.stringify(i.selectedSauces) === JSON.stringify(item.sauces) &&
        i.selectedTaste === item.taste
      );

      if (existingItem) {
        return currentItems.map(i => 
          i === existingItem 
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }

      return [...currentItems, {
        ...item,
        selectedSize: item.size,
        selectedSauces: item.sauces,
        selectedTaste: item.taste,
        price: item.totalPrice / item.quantity
      }];
    });
  };

  const updateItem = (itemId, updatedItem) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, ...updatedItem } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const canPlaceOrder = () => {
    if (items.length === 0) return false;
    if (!selectedAddress) return false;
    if (!paymentMethod) return false;
    if (orderType === 'Delivery' && deliveryTime === 'Later' && !selectedDateTime) return false;
    return true;
  };

  const placeOrder = () => {
    if (!canPlaceOrder()) {
      console.error('Cannot place order: missing required information');
      return null;
    }

    const orderData = {
      orderId: Date.now(),
      orderDate: new Date().toISOString(),
      items,
      orderType,
      deliveryTime: deliveryTime === 'Now' ? 'ASAP' : selectedDateTime,
      selectedAddress,
      deliveryInstructions,
      paymentMethod,
      pricing: orderCalculation?.payable_amount?.reduce((acc, item) => {
        acc[item.title.toLowerCase().replace(/\s+/g, '_')] = Number(item.value);
        return acc;
      }, {})
    };

    // Store order in localStorage
    const previousOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...previousOrders, orderData]));

    // Clear cart
    setItems([]);
    setOrderType('Delivery');
    setDeliveryTime('Now');
    setSelectedDateTime('');
    setSelectedTip(null);
    setSelectedAddress(null);
    setDeliveryInstructions([]);
    setPaymentMethod(null);
    setCheckoutStep(1);

    return orderData;
  };

  const uniqueItemsCount = items.length;

  return (
    <CartContext.Provider value={{
      isOpen,
      items,
      orderType,
      deliveryTime,
      selectedDateTime,
      selectedTip,
      selectedAddress,
      deliveryInstructions,
      paymentMethod,
      checkoutStep,
      orderCalculation,
      isCalculating,
      uniqueItemsCount,
      toggleCart,
      addItem,
      removeItem,
      updateItem,
      updateQuantity,
      setIsOpen,
      setItems,
      setOrderType,
      setDeliveryTime,
      setSelectedDateTime,
      setSelectedTip,
      setSelectedAddress,
      setDeliveryInstructions,
      setPaymentMethod,
      setCheckoutStep,
      placeOrder,
      canPlaceOrder,
      updateOrderCalculation
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;