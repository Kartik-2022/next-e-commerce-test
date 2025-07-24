    // src/components/ShopPageButtons.tsx
    'use client'; 

    import { useRouter } from 'next/navigation'; 
    import React from 'react'; 

    export default function ShopPageButtons() {
      const router = useRouter();

      return (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Other Pages:</h2>
          <button
            onClick={() => router.push('/products')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Go to All Products
          </button>
          <button
            onClick={() => router.push('/cart')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Go to Cart
          </button>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Go to Checkout
          </button>
          <button
            onClick={() => router.push('/isr-page')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to ISR Page
          </button>
          <button
            onClick={() => router.push('/ssr-page')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Go to SSR Page
          </button>
        </div>
      );
    }
    