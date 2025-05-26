"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Tables } from "@/database.types";

interface CartItem extends Tables<"products"> {
  quantity: number;
}

export function AddToCartButton({ product }: { product: Tables<"products"> }) {
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = () => {
    setIsAdding(true);

    // Get current cart from localStorage
    const existingCart = localStorage.getItem("cart");
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    // Check if product already in cart
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex >= 0) {
      // Increment quantity if product already in cart
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new product with quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch custom event to notify components about cart update
    window.dispatchEvent(new Event("cartUpdated"));

    // Reset button state after a brief delay
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <Button
      onClick={addToCart}
      size="sm"
      className="w-full mt-2"
      disabled={isAdding}
    >
      <ShoppingCart className="mr-1 h-4 w-4" />
      {isAdding ? "Added!" : "Add to cart"}
    </Button>
  );
}
