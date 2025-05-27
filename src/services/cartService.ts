import { CartItem } from "@/domain/CartItem";

export async function placeOrderCart(cartItems: CartItem[]) {
  const orderItems = cartItems.map((item) => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.quantity * item.price,
  }));

  const res = await fetch("/api/order-save", {
    method: "POST",
    body: JSON.stringify(orderItems),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorData = await res.json();
    const error = new Error(errorData.error || "Unknown error");
    (error as any).status = res.status;
    throw error;
  }

  const data = await res.json();
  return data;
}
