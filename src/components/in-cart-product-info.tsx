import { Hourglass } from "lucide-react";

export function InCartProductInfo({
  loading,
  quantityInCart,
}: {
  loading: boolean;
  quantityInCart: number | undefined;
}) {
  return (
    <>
      In cart: {loading ? <Hourglass width={18} height={18} /> : quantityInCart}{" "}
      /{" "}
    </>
  );
}
