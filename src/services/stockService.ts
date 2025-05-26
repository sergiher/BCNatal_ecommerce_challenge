export const checkStock = async (productId: number, quantityInCart: number) => {
  const res = await fetch("/api/stock-check", {
    method: "POST",
    body: JSON.stringify({ productId, quantityInCart }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data.inStock;
};
