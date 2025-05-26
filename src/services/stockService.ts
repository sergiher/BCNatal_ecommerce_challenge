import { toast } from "sonner";

export const checkStockQuantity = async (
  productId: number,
  quantityInCart: number,
  showToastMessage: boolean = true
) => {
  const res = await fetch("/api/stock-check", {
    method: "POST",
    body: JSON.stringify({ productId, quantityInCart }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  if (data.inStockQuantity <= 0 && showToastMessage) {
    toast.error(process.env.NEXT_PUBLIC_NO_STOCK_MESSAGE ?? "Out of stock");
    return 0;
  }

  return data.inStockQuantity;
};
