import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { STORAGE_CONFIG } from '@/lib/config';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const { FALLBACK_IMAGE_URL } = STORAGE_CONFIG;

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-zinc-800 rounded-md shadow-sm cursor-pointer border border-gray-200 dark:border-zinc-700 transition-all duration-200 hover:shadow-md hover:scale-[1.01] transform-gpu"
    >
      <div className="product-image-container">
        {!product.imageUrl || imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-700">
            <span className="text-gray-400 dark:text-zinc-500 text-xs">Image not available</span>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-t-md"
              onError={() => setImageError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
              unoptimized
            />
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-medium text-xs text-gray-800 dark:text-zinc-100 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 dark:text-zinc-300 text-xs mt-0.5">
          €{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}