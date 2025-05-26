import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { productId, quantityInCart } = await req.json();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ inStock: quantityInCart < data?.stock });
}
