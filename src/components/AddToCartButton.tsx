    // src/components/AddToCartButton.tsx
    'use client'; 

    import { useCartContext } from '@/components/CartProvider';
    import React from 'react';

    type ProductForCart = {
      id: number;
      title: string;
      price: number;
      image: string; 
    };

    export default function AddToCartButton({ product }: { product: ProductForCart }) {
      const { addToCart } = useCartContext();

      const handleAddToCart = () => {
        addToCart(product);
      };

      return (
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-auto"
        >
          Add to Cart
        </button>
      );
    }
    