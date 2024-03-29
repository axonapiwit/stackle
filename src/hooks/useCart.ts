import { Product } from "@/Types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "react-hot-toast";

export type CartItem = {
  product: Product;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        set((state) => {
          toast.success("Item added to cart");
          return { items: [...state.items, { product }] };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
          toast.success("Item removed from the cart");
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
