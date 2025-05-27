"use client";

import { useStockQuantity } from "@/services/stockService";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";
import { QuantityInCart } from "./quantity-in-cart";
import { CartItem } from "@/domain/CartItem";

export function CartItemWithStockInfo({
  item,
  updateQuantity,
  removeFromCart,
}: {
  item: CartItem;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeFromCart: (id: number) => void;
}) {
  const { inStockQuantity, loading } = useStockQuantity(item);

  return (
    <Card key={item.id}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative w-24 h-24">
            <Image
              src={`/products/${item.id}.png`}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.name}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {item.description}
            </p>
            <QuantityInCart
              inProductCardComp={false}
              inCartPage={true}
              loading={loading}
              inStockQuantity={inStockQuantity}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    updateQuantity(item.id, item.quantity - 1);
                    // Dispatch custom event to notify components about this click
                    window.dispatchEvent(new Event("cartUpdated"));
                  }}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={
                    inStockQuantity !== undefined && inStockQuantity <= 0
                  }
                  onClick={async () => {
                    inStockQuantity !== undefined &&
                      inStockQuantity > 0 &&
                      updateQuantity(item.id, item.quantity + 1);
                    // Dispatch custom event to notify components about this click
                    window.dispatchEvent(new Event("cartUpdated"));
                  }}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-medium">
                {(item.price * item.quantity).toFixed(2)}€
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
