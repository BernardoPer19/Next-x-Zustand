'use client';

import { useFavorites } from '@/store/store-favorites';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { ProductsType } from '@/types/interfaces.ProductsType';
import { useEffect, useState } from 'react';

interface Props {
  product: ProductsType;
}

export default function FavoriteButton({ product }: Props) {
  const toggleFavorite = useFavorites((state) => state.toggleFavorite);
  const isFavorite = useFavorites((state) => state.isFavorite(product.id));

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => toggleFavorite(product)}
      className="flex items-center justify-center p-2 rounded-full border border-gray-300 text-red-500 hover:bg-red-100 transition"
      aria-label="Toggle Favorite"
    >
      {isFavorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
