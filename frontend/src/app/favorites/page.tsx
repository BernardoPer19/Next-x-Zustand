"use client";

import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/store/store-favorites";
import React from "react";

const FavoritesPage = () => {
  const favorites = useFavorites((state) => state.favorites);

  if (favorites.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <h2 className="text-2xl font-semibold mb-4">😢 No hay favoritos aún</h2>
        <p>Agrega productos a favoritos y aparecerán aquí.</p>
      </div>
    );
  }

  return (
    <div className="p-8 w-[1200px] m-auto">
      <h1 className="text-3xl font-bold mb-6">❤️ Tus Favoritos</h1>
      <ProductCard products={favorites} />
    </div>
  );
};

export default FavoritesPage;
