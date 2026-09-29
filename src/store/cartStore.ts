import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product, ProductVariant } from "../types";

export const FREE_SHIPPING_THRESHOLD = 5000;
export const SHIPPING_FLAT = 199;

function variantKey(v?: ProductVariant) {
  if (!v) return "default";
  return [v.size ?? "", v.finish ?? "", v.purity ?? ""].join("|");
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAddedAt: number;
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => { ok: boolean; reason?: string };
  removeItem: (productId: string, variant?: ProductVariant) => void;
  setQuantity: (productId: string, quantity: number, variant?: ProductVariant) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAddedAt: 0,
      addItem: (product, quantity = 1, variant) => {
        const key = variantKey(variant);
        const items = [...get().items];
        const idx = items.findIndex((i) => i.productId === product.id && variantKey(i.variant) === key);
        const current = idx >= 0 ? items[idx].quantity : 0;
        if (current + quantity > product.stock) {
          return { ok: false, reason: `Only ${product.stock} available` };
        }
        if (idx >= 0) items[idx] = { ...items[idx], quantity: current + quantity };
        else items.push({ productId: product.id, quantity, variant, addedAt: Date.now() });
        set({ items, isOpen: true, lastAddedAt: Date.now() });
        return { ok: true };
      },
      removeItem: (productId, variant) => {
        const key = variantKey(variant);
        set({ items: get().items.filter((i) => !(i.productId === productId && variantKey(i.variant) === key)) });
      },
      setQuantity: (productId, quantity, variant) => {
        const key = variantKey(variant);
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId && variantKey(i.variant) === key ? { ...i, quantity } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ isOpen: open }),
    }),
    { name: "idiol-cart-v1", storage: createJSONStorage(() => localStorage), partialize: (s) => ({ items: s.items } as CartState) }
  )
);

export function cartCount(items: CartItem[]) {
  return items.reduce((n, i) => n + i.quantity, 0);
}
