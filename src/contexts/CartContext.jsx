import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

// Local storage key
const CART_STORAGE_KEY = 'shopping_cart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage or with an empty array
  const [items, setItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // Sync localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart to localStorage', error);
    }
  }, [items]);

  // Listen for localStorage changes in other tabs
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === CART_STORAGE_KEY && event.newValue) {
        try {
          const parsedItems = JSON.parse(event.newValue);
          setItems(parsedItems);
        } catch (error) {
          console.error('Failed to parse cart from localStorage', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const addItem = useCallback((item) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => 
        i.id === item.id && 
        JSON.stringify(i.selectedToppings) === JSON.stringify(item.selectedToppings)
      );
      
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id && 
          JSON.stringify(i.selectedToppings) === JSON.stringify(item.selectedToppings)
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...currentItems, { ...item, quantity: item.quantity || 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id, selectedToppings) => {
    setItems(items => items.filter(item => 
      !(item.id === id && 
        JSON.stringify(item.selectedToppings) === JSON.stringify(selectedToppings))
    ));
  }, []);

  const updateQuantity = useCallback((id, quantity, selectedToppings) => {
    setItems(items =>
      items.map(item =>
        (item.id === id && 
         JSON.stringify(item.selectedToppings) === JSON.stringify(selectedToppings))
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Total quantity of all items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Number of unique items (unique combinations of ID and toppings)
  const uniqueItemsCount = items.length;

  const totalPrice = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const toppingsTotal = (item.selectedToppings?.length || 0) * 1.5 * item.quantity;
    return sum + itemTotal + toppingsTotal;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      toggleCart,
      closeCart,
      clearCart,
      totalItems,
      uniqueItemsCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;