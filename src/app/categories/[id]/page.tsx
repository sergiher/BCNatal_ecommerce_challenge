import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { CartButton } from "@/components/cart-button";
import { ProductList } from "@/components/product-list";
import { notFound } from "next/navigation";
import { GoBackButton } from "@/components/go-back-button";

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
          <GoBackButton type="ghost" />
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

      {products ? (
        <ProductList products={products} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
