import { ProductsType } from "@/types/interfaces.ProductsType";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartItem = ProductsType & { quantity: number };

type CartState = {
    cart: CartItem[];
};

type CartActions = {
    addToCart: (product: ProductsType) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    updateQuantity: (productId: number, quantity: number) => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
};

export const useCart = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            cart: [],

            addToCart: (product) => {
                const existing = get().cart.find(prod => { prod.id === product.id })
                if (existing) {
                    set({
                        cart: get().cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
                    })
                } else {
                    set({ cart: [...get().cart, { ...product, quantity: 1 }] })
                }
            },

            removeFromCart: (productID) => {
                set({ cart: get().cart.filter(prod => prod.id !== productID) })
            },

            clearCart: () => set({ cart: [] }),

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                    return;
                }

                set({
                    cart: get().cart.map((item) =>
                        item.id === productId ? { ...item, quantity } : item
                    )
                })
            },
            getTotalItems: () =>
                get().cart.reduce((sum, item) => sum + item.quantity, 0),

            getTotalPrice: () =>
                get().cart.reduce(
                    (total, item) => total + item.quantity * item.price,
                    0
                ),
        }),

        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
