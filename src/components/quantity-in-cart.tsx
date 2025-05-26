"use client";

import { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import { checkStockQuantity } from "@/services/stockService";
import { Hourglass } from "lucide-react";
import { InCartProductInfo } from "./in-cart-product-info";
import { AvailableProductInfo } from "./available-product-info";

interface CartItem extends Tables<"products"> {
  quantity: number;
}

export function QuantityInCart({
  product,
  showInCartProductInfo = true,
}: {
  product: Tables<"products">;
  showInCartProductInfo?: boolean;
}) {
  const [quantityInCart, setQuantityInCart] = useState<number>();
  const [inStockQuantity, setInStockQuantity] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartAndStock = async () => {
      setLoading(true);
      const existingCart = localStorage.getItem("cart");
      const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        setQuantityInCart(existingItem.quantity);
      } else {
        setQuantityInCart(0);
      }

      const stock = await checkStockQuantity(
        product.id,
        existingItem?.quantity ?? 0,
        false
      );
      setInStockQuantity(stock);
      setLoading(false);
    };

    loadCartAndStock();

    window.addEventListener("cartUpdated", loadCartAndStock);
    return () => window.removeEventListener("cartUpdated", loadCartAndStock);
  }, [product.id]);

  return (
    <>
      <div className="text-sm text-muted-foreground mb-1">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            paddingBottom: "10px",
          }}
        >
          {showInCartProductInfo && (
            <InCartProductInfo
              loading={loading}
              quantityInCart={quantityInCart}
            />
          )}
          <AvailableProductInfo
            loading={loading}
            inStockQuantity={inStockQuantity}
          />
        </div>
      </div>
    </>
  );
}
