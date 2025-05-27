"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { CartItem } from "@/domain/CartItem";

export function ProductList({ products }: { products: CartItem[] }) {
  const [query, setQuery] = useState("");
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input
        type="text"
        placeholder="Search products..."
        className="w-full border rounded p-2 mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
