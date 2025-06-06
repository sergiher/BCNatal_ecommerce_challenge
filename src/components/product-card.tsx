"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import Image from "next/image";
import { QuantityInCart } from "@/components/quantity-in-cart";
import { useStockQuantity } from "@/services/stockService";
import { CartItem } from "@/domain/CartItem";

export function ProductCard({ product }: { product: CartItem }) {
  const { quantityInCart, inStockQuantity, loading } =
    useStockQuantity(product);
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-col flex-1 space-y-2">
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
            <p
              className="text-sm text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
          <p className="font-medium">{product.price.toFixed(2)}€</p>
        </div>
        <QuantityInCart
          loading={loading}
          quantityInCart={quantityInCart}
          inStockQuantity={inStockQuantity}
        />
        <div className="w-full mt-auto">
          <AddToCartButton
            product={product}
            inStockQuantity={inStockQuantity}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
