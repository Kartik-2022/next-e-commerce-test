    // src/components/CartProvider.tsx
    'use client'; 

    import React, { createContext, useContext } from 'react';
    import { useCart } from '@/hooks/useCart'; 


    const CartContext = createContext<ReturnType<typeof useCart> | undefined>(undefined);

   
    export function useCartContext() {
      const context = useContext(CartContext);
      if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
      }
      return context;
    }

    export default function CartProvider({ children }: { children: React.ReactNode }) {
      const cart = useCart(); 

      return (
        <CartContext.Provider value={cart}>
          {children}
        </CartContext.Provider>
      );
    }
    