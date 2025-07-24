// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';
import { cookies } from 'next/headers';

import HeaderAuthActions from '@/components/HeaderAuthActions'; 
import CartProvider from '@/components/CartProvider'; 

export const metadata = {
  title: 'My E-commerce Shop',
  description: 'A simple e-commerce application',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = (await cookies()).get('isAuthenticated')?.value === 'true';

  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 text-white p-4 shadow-lg">
          <nav className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-2">
            <Link href="/" className="text-2xl font-extrabold text-indigo-300 hover:text-indigo-200 transition-colors duration-200 mb-4 sm:mb-0 px-3 py-2">
              MyShop
            </Link>
            <div className="flex items-center space-x-6 sm:space-x-8">
              <Link href="/products" className="text-lg hover:text-gray-300 transition-colors duration-200 px-3 py-2">
                Products
              </Link>
              <Link href="/cart" className="text-lg hover:text-gray-300 transition-colors duration-200 px-3 py-2">
                Cart
              </Link>
              <HeaderAuthActions isAuthenticated={isAuthenticated} /> 
            </div>
          </nav>
        </header>
        <main className="min-h-screen bg-gray-100 py-8">
          <CartProvider>
            {children}
          </CartProvider>
        </main>
      </body>
    </html>
  );
}
