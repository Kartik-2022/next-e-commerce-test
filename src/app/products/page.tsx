// src/app/products/page.tsx
import Link from 'next/link';

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


export async function getProducts(): Promise<Product[]> {
  console.log('Fetching all products server-side for /products...');
  const response = await fetch('https://fakestoreapi.com/products', {
    cache: 'no-store', 
  });

  if (!response.ok) {
    console.error('Failed to fetch products (server-side):', response.status, response.statusText);
    return [];
  }

  const data: Product[] = await response.json();
  return data;
}

export default async function ProductsPage() { 
  const products = await getProducts();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">All Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found. Please try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300">
              <div className="relative w-full h-48 flex items-center justify-center bg-gray-100 p-4">
                <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-tight truncate">{product.title}</h2>
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
    </div>
  );
}
