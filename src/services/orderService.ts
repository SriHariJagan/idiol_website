import type { CheckoutFormData } from "../types";

/** Placeholder order + payment surface. UI-complete, backend-agnostic. */
export interface OrderSummary {
  items: { productId: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export async function submitOrder(_form: CheckoutFormData, summary: OrderSummary): Promise<{ orderId: string }> {
  await new Promise((r) => setTimeout(r, 900));
  const orderId = `IDL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  void summary;
  return { orderId };
}

export async function submitCustomOrder(_payload: Record<string, unknown>): Promise<{ reference: string }> {
  await new Promise((r) => setTimeout(r, 800));
  return { reference: `CUS-${Math.floor(10000 + Math.random() * 90000)}` };
}

export async function subscribeNewsletter(_email: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
}
