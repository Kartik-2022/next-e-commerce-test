// src/app/checkout/page.tsx
'use client'; 

import { cookies } from 'next/headers'; 
import { redirect } from 'next/navigation';
import { useCart } from '@/hooks/useCart'; 
import { useEffect, useState } from 'react'; 


async function getCartDataClient(): Promise<{ items: any[], total: number }> {

  const storedCart = localStorage.getItem('cart');
  const items = storedCart ? JSON.parse(storedCart) : [];
  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  
  await new Promise(resolve => setTimeout(resolve, 500)); 
  return { items, total };
}

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, isCartLoaded } = useCart(); 
  const [serverItems, setServerItems] = useState<any[]>([]);
  const [serverTotal, setServerTotal] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchInitialCart = async () => {
      setLoading(true);
      const { items, total } = await getCartDataClient();
      setServerItems(items);
      setServerTotal(total);
      setLoading(false);
    };
    fetchInitialCart();
  }, []);


  if (!isCartLoaded || loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-600">Loading cart for checkout...</p>
      </div>
    );
  }


  const displayItems = cartItems.length > 0 ? cartItems : serverItems;
  const displayTotal = cartItems.length > 0 ? getTotalPrice : serverTotal;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        <p className="text-lg text-gray-600 mb-4">
          Confirm your order details below.
        </p>

        {displayItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty. Cannot checkout.</p>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200 mb-6">
              {displayItems.map(item => (
                <li key={item.id} className="py-2 flex justify-between items-center">
                  <span className="text-gray-700">{item.title} x {item.quantity}</span>
                  <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-right text-xl font-bold text-gray-800 mb-6">
              Total: ${displayTotal.toFixed(2)}
            </div>
            <button className="w-full bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition-colors duration-300">
              Place Order (Simulated)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
