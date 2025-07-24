// src/app/cart/page.tsx
'use client';

import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, updateCartItemQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600 mb-4">Your cart is empty. Start shopping!</p>
          <Link href="/products" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="divide-y divide-gray-200 mb-6">
            {cartItems.map(item => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" /> 
                  <div>
                    <p className="text-lg font-semibold text-gray-800">{item.title}</p>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)} 
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-gray-800 font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)} 
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right text-xl font-bold text-gray-800 mb-6">
            Total: ${getTotalPrice.toFixed(2)} 
          </div>
          <div className="flex justify-between space-x-4">
            <button
              onClick={clearCart} 
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 transition-colors duration-300 flex-grow"
            >
              Clear Cart
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300 flex-grow"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
