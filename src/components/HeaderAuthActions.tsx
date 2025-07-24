// src/components/HeaderAuthActions.tsx
'use client'; // This is a Client Component

import Link from 'next/link';


export default function HeaderAuthActions({ isAuthenticated: initialIsAuthenticated }: { isAuthenticated: boolean }) {


  return (
    <> 
      {initialIsAuthenticated ? (
        <Link href="/shop" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-lg">
          My Shop
        </Link>
      ) : (
        <Link href="/login" className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition-colors duration-200 text-lg">
          Login
        </Link>
      )}
    </>
  );
}
