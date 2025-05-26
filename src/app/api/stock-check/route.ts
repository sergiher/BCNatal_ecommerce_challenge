import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { productId, quantityInCart } = await req.json();
  const supabase = await createClient();

  const { data } = await supabase
    .from("products")
    .select("stock")
    .eq("id", productId)
    .single();

  return NextResponse.json({ inStock: quantityInCart < data?.stock });
}
