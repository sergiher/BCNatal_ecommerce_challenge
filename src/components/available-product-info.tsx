import { Hourglass } from "lucide-react";

export function AvailableProductInfo({
  loading,
  inStockQuantity,
}: {
  loading: boolean;
  inStockQuantity: number | undefined;
}) {
  return (
    <>
      Available:{" "}
      {loading ? <Hourglass width={18} height={18} /> : inStockQuantity}
    </>
  );
}
