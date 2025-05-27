"use client";

import { useEffect, useState } from "react";
import { Tables } from "@/database.types";
import { checkStockQuantity } from "@/services/stockService";
import { Hourglass } from "lucide-react";
import { InCartProductInfo } from "./in-cart-product-info";
import { AvailableProductInfo } from "./available-product-info";

export function QuantityInCart({
  product,
  showInCartProductInfo = true,
  loading,
  quantityInCart,
  inStockQuantity,
}: {
  product: Tables<"products">;
  showInCartProductInfo?: boolean;
  loading: boolean;
  quantityInCart: number | undefined;
  inStockQuantity: number | undefined;
}) {
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
