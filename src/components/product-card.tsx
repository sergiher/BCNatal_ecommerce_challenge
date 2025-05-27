"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import Image from "next/image";
import { Tables } from "@/database.types";
import { QuantityInCart } from "@/components/quantity-in-cart";
import { useEffect, useState } from "react";
import { checkStockQuantity } from "@/services/stockService";

interface CartItem extends Tables<"products"> {
  quantity: number;
}

export function ProductCard({ product }: { product: Tables<"products"> }) {
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-2">
        <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden p-4">
          <Image
            src={`/products/${product.id}.png`}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <p className="font-medium">{product.price.toFixed(2)}€</p>
        </div>
        <QuantityInCart
          product={product}
          loading={loading}
          quantityInCart={quantityInCart}
          inStockQuantity={inStockQuantity}
        />
        <AddToCartButton product={product} inStockQuantity={inStockQuantity} />
      </CardHeader>
    </Card>
  );
}
