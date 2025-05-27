import { useEffect, useState } from "react";
import { CartItem } from "@/domain/CartItem";

export const checkStockQuantity = async (
  productId: number,
  quantityInCart: number
) => {
  const res = await fetch("/api/stock-check", {
    method: "POST",
    body: JSON.stringify({ productId, quantityInCart }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  return data.inStockQuantity;
};

export function useStockQuantity(product: CartItem) {
  const [quantityInCart, setQuantityInCart] = useState<number>(0);
  const [inStockQuantity, setInStockQuantity] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartAndStock = async () => {
      setLoading(true);
      const existingCart = localStorage.getItem("cart");
      const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

      const existingItem = cart.find((item) => item.id === product.id);
      const quantity = existingItem?.quantity ?? 0;

      setQuantityInCart(quantity);

      const stock = await checkStockQuantity(product.id, quantity);
      setInStockQuantity(stock);
      setLoading(false);
    };

    loadCartAndStock();

    window.addEventListener("cartUpdated", loadCartAndStock);
    return () => window.removeEventListener("cartUpdated", loadCartAndStock);
  }, [product.id]);

  return { quantityInCart, inStockQuantity, loading };
}
