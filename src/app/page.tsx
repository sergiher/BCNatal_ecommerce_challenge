import { createClient } from "@/utils/supabase/server";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/components/user-profile";
import { CartButton } from "@/components/cart-button";
import Image from "next/image";
import Link from "next/link";
import { Tables } from "@/database.types";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: categories } = await supabase.from("categories").select();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="flex justify-between items-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Categories</h1>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {categories?.map((category: Tables<"categories">) => (
          <Link href={`/categories/${category.id}`} key={category.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="space-y-2">
                <div className="relative w-full h-40 sm:h-48 rounded-xl overflow-hidden">
                  <Image
                    src={`/categories/${category.id}.jpg`}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardTitle className="text-lg sm:text-xl">
                  {category.name}
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
