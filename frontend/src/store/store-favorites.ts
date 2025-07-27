import { ProductsType } from "@/types/interfaces.ProductsType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  favorites: ProductsType[];
};

type Actions = {
  toggleFavorite: (product: ProductsType) => void;
  isFavorite: (id: number) => boolean;
};

// ✅ función separada limpia y reutilizable
export const getUpdateFavorites = (
  currentList: ProductsType[],
  product: ProductsType
): ProductsType[] => {
  const exists = currentList.some((p) => p.id === product.id);
  const updated = exists
    ? currentList.filter((p) => p.id !== product.id)
    : [...currentList, product];

  return updated;
};

// ✅ Zustand store con persistencia
export const useFavorites = create<State & Actions>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const currentFavorites = get().favorites;
        const updated = getUpdateFavorites(currentFavorites, product);
        set({ favorites: updated });
      },

      isFavorite: (id) => get().favorites.some((p) => p.id === id),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
