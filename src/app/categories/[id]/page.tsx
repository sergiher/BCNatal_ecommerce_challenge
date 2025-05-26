import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { ProductCard } from "@/components/product-card";
import { CartButton } from "@/components/cart-button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Tables } from "@/database.types";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { id } = await params;

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (!category) {
    notFound();
  }

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", id);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold">{category.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <CartButton />
          {user ? (
            <UserProfile user={user} />
          ) : (
            <Button asChild>
              <a href="/login">Sign in</a>
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products?.map((product: Tables<"products">) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
