    // src/hooks/useCart.ts
    'use client';

    import { useState, useEffect, useCallback, useMemo } from 'react';
    import { toast } from 'react-toastify';

    type Product = {
      id: number;
      title: string;
      price: number;
      image: string;
    };

    type CartItem = {
      id: number;
      title: string;
      price: number;
      image: string;
      quantity: number;
    };

    const CART_STORAGE_KEY = 'my-ecommerce-cart';

    export function useCart() {
      const [cartItems, setCartItems] = useState<CartItem[]>([]);
      const [isCartLoaded, setIsCartLoaded] = useState(false); 

      
      useEffect(() => {
        try {
          const storedCart = localStorage.getItem(CART_STORAGE_KEY);
          if (storedCart) {
            setCartItems(JSON.parse(storedCart));
          }
        } catch (error) {
          console.error("Failed to load cart from localStorage:", error);
          localStorage.removeItem(CART_STORAGE_KEY); // Clear corrupted data
          toast.error("Error loading cart. Your cart has been reset.");
        } finally {
          setIsCartLoaded(true);
        }
      }, []);

      
      useEffect(() => {
        if (isCartLoaded) { 
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
        }
      }, [cartItems, isCartLoaded]);

      const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setCartItems(prevItems => {
          const existingItem = prevItems.find(item => item.id === product.id);

          if (existingItem) {
            const updatedItems = prevItems.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            toast.success(`${product.title} quantity updated in cart!`);
            return updatedItems;
          } else {
            const newItem: CartItem = { ...product, quantity };
            toast.success(`${product.title} added to cart!`);
            return [...prevItems, newItem];
          }
        });
      }, []);

      const updateCartItemQuantity = useCallback((id: number, newQuantity: number) => {
        setCartItems(prevItems => {
          const updatedItems = prevItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          ).filter(item => item.quantity > 0); 
          toast.info(`Quantity updated for item ID: ${id}`);
          return updatedItems;
        });
      }, []);

      const removeFromCart = useCallback((id: number) => {
        setCartItems(prevItems => {
          const updatedItems = prevItems.filter(item => item.id !== id);
          toast.info(`Item removed from cart!`);
          return updatedItems;
        });
      }, []);

      const clearCart = useCallback(() => {
        setCartItems([]);
        toast.info("Cart cleared!");
      }, []);

      const getTotalItems = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
      }, [cartItems]);

      const getTotalPrice = useMemo(() => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      }, [cartItems]);

      return {
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartLoaded,
      };
    }
    