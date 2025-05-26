"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import Image from "next/image";
import { Tables } from "@/database.types";

export function ProductCard({ product }: { product: Tables<"products"> }) {
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
        <AddToCartButton product={product} />
      </CardHeader>
    </Card>
  );
}
