import { toast } from "sonner";

export const checkStock = async (productId: number, quantityInCart: number) => {
  const res = await fetch("/api/stock-check", {
    method: "POST",
    body: JSON.stringify({ productId, quantityInCart }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  if (!data.inStock) {
    toast.error(process.env.NEXT_PUBLIC_NO_STOCK_MESSAGE ?? "Out of stock");
    return false;
  }

  return data.inStock;
};
