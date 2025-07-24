// src/app/products/[id]/page.tsx

import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';


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

async function getProduct(id: string): Promise<Product | undefined> {
  console.log(`Fetching product ${id} server-side for /products/${id}...`);
  const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
    cache: 'no-store', 
  });

  if (!response.ok) {
    return undefined;
  }

  const data: Product = await response.json();
  return data;
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative w-full md:w-1/2 h-64 flex items-center justify-center bg-gray-100 rounded-md p-4">
          <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain" />
        </div>
        <div className="md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{product.title}</h1>
          <p className="text-indigo-600 text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6 flex-grow">{product.description}</p>
          <AddToCartButton product={product} /> 
        </div>
      </div>
    </div>
  );
}
