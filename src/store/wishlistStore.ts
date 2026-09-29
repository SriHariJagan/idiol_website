import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { WishlistItem } from "../types";

interface WishlistState {
  items: WishlistItem[];
  toggle: (productId: string) => boolean;
  remove: (productId: string) => void;
  clear: () => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) => {
        const exists = get().items.some((i) => i.productId === productId);
        if (exists) set({ items: get().items.filter((i) => i.productId !== productId) });
        else set({ items: [...get().items, { productId, addedAt: Date.now() }] });
        return !exists;
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      has: (productId) => get().items.some((i) => i.productId === productId),
    }),
    { name: "idiol-wishlist-v1", storage: createJSONStorage(() => localStorage) }
  )
);
