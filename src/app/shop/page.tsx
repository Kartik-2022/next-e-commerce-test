// src/app/shop/page.tsx
export const revalidate = 60; 

import Link from 'next/link';
import ShopPageButtons from '@/components/ShopPageButtons';


type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

async function getFeaturedProducts(): Promise<Product[]> {
  console.log('Fetching featured products server-side for /shop...');
  const response = await fetch('https://fakestoreapi.com/products?limit=3', {
    cache: 'no-store', 
  });

  if (!response.ok) {
    console.error('Failed to fetch featured products (server-side):', response.status, response.statusText);
    return [];
  }

  const data: Product[] = await response.json();
  return data;
}

export default async function ShopPage() { 
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to MyShop!</h1>
      <p className="text-lg text-gray-600 mb-10">Discover our amazing products.</p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Featured Products</h2>
      {featuredProducts.length === 0 ? (
        <p className="text-center text-gray-600">No featured products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 p-4">
                <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow overflow-hidden text-ellipsis line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-indigo-600">${product.price.toFixed(2)}</span>
                  <Link href={`/products/${product.id}`} className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300 text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ShopPageButtons /> 
    </div>
  );
}
