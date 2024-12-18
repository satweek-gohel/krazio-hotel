import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    localStorage.setItem('cartOpen', isOpen);
  }, [isOpen]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

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

  const placeOrder = () => {
    const deliveryFee = orderType === 'Delivery' ? 5.99 : 0;
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee + (selectedTip || 0);

    const orderData = {
      orderId: Date.now(),
      orderDate: new Date().toISOString(),
      items,
      orderType,
      deliveryTime: deliveryTime === 'Now' ? 'ASAP' : selectedDateTime,
      selectedAddress,
      deliveryInstructions,
      paymentMethod,
      pricing: {
        subtotal,
        deliveryFee,
        tip: selectedTip || 0,
        total
      }
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

    console.log('Order placed:', orderData);
    return orderData;
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItemsCount = items.length;

  return (
    <CartContext.Provider value={{
      isOpen,
      items,
      toggleCart,
      addItem,
      removeItem,
      updateItem,
      updateQuantity,
      totalPrice,
      totalItems,
      uniqueItemsCount,
      orderType,
      setOrderType,
      deliveryTime,
      setDeliveryTime,
      selectedDateTime,
      setSelectedDateTime,
      selectedTip,
      setSelectedTip,
      selectedAddress,
      setSelectedAddress,
      deliveryInstructions,
      setDeliveryInstructions,
      paymentMethod,
      setPaymentMethod,
      placeOrder
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