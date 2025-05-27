import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const orderItems = await req.json();

  if (!Array.isArray(orderItems)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const singleOrder = {
    product_info: orderItems,
    user_id: user.id,
  };

  const { data, error } = await supabase.from("orders").insert(singleOrder);

  if (error) {
    console.error("Insert error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
