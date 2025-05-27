"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CartItemWithStockInfo } from "@/components/cart-item-with-stock-info";
import { CartItem } from "@/domain/CartItem";
import { toast } from "sonner";
import { placeOrderCart } from "@/services/cartService";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const checkoutCart = async () => {
    try {
      await placeOrderCart(cartItems);
      clearCart();
      toast.success("Checkout successful!");
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("You have to go back and sign in");
      } else {
        toast.error("Checkout error");
      }
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
        {cartItems.length > 0 && (
          <Button variant="outline" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl mb-4">Your cart is empty</h2>
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6 mb-6">
            {cartItems.map((item) => (
              <CartItemWithStockInfo
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <Card className="mt-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Total</h3>
                <p className="text-lg font-bold">
                  {getTotalPrice().toFixed(2)}€
                </p>
              </div>
              <Button className="w-full mt-4" onClick={checkoutCart}>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
