"use client";

import { InCartProductInfo } from "./in-cart-product-info";
import { AvailableProductInfo } from "./available-product-info";

export function QuantityInCart({
  inProductCardComp = true,
  inCartPage = false,
  loading,
  quantityInCart,
  inStockQuantity,
}: {
  inProductCardComp?: boolean;
  inCartPage?: boolean;
  loading: boolean;
  quantityInCart?: number | undefined;
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
          {inProductCardComp && (
            <InCartProductInfo
              loading={loading}
              quantityInCart={quantityInCart}
            />
          )}
          <AvailableProductInfo
            loading={loading}
            inStockQuantity={inStockQuantity}
          />
          {inCartPage &&
            inStockQuantity !== undefined &&
            inStockQuantity <= 0 && (
              <>
                &nbsp;-&nbsp;
                <span style={{ color: "red" }}>
                  {process.env.NEXT_PUBLIC_NO_STOCK_MESSAGE}
                </span>
              </>
            )}
        </div>
      </div>
    </>
  );
}
